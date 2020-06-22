import { buildSchemaSync as buildTypedSchema, BuildSchemaOptions, createResolversMap } from 'type-graphql'
import { specifiedDirectives } from 'graphql'
import federationDirectives from '@apollo/federation/dist/directives'
import { addResolversToSchema, GraphQLResolverMap } from 'apollo-graphql'
import {
  printSchema,
  buildFederatedSchema as buildApolloFederationSchema,
} from '@apollo/federation'
import { GraphQLSchema } from 'graphql'
import gql from 'graphql-tag'
import { AuthContext } from './AuthContext'

export const buildSchema = (
  options: Omit<BuildSchemaOptions, 'skipCheck'>,
  referenceResolvers?: GraphQLResolverMap<unknown>,
): GraphQLSchema => {
  const schema = buildTypedSchema({
    ...options,
    directives: [...specifiedDirectives, ...federationDirectives, ...(options.directives || [])],
    skipCheck: true,
    authChecker: ({ context }, roles) => {
      const { auth } = context

      if (roles.length === 0) {
        return auth.user !== undefined
      }

      return roles.includes(auth.user.access)
    },
  })

  const federatedSchema = buildApolloFederationSchema({
    typeDefs: gql(printSchema(schema)),
    resolvers: createResolversMap(schema) as GraphQLResolverMap<AuthContext>,
  })

  if (referenceResolvers) {
    addResolversToSchema(federatedSchema, referenceResolvers)
  }

  return federatedSchema
}
