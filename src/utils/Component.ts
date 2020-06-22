import { BuildSchemaOptions } from 'type-graphql'
import { Container } from 'typedi'
import { buildSchema } from './buildSchema'
import { createServer } from './createServer'
import { ApolloServer } from 'apollo-server-express'
import { GraphQLSchema } from 'graphql'

type Options = Omit<BuildSchemaOptions, 'skipCheck'>

export default class Component {
  public options: Options

  constructor(
    resolvers: Options['resolvers'],
    types?: Options['orphanedTypes'],
    options: Omit<Options, 'resolvers' | 'orphanedTypes'> = {},
    container: typeof Container = Container,
  ) {
    this.options = {
      ...options,
      container,
      resolvers,
      orphanedTypes: types,
    }
  }

  get schema(): GraphQLSchema {
    return buildSchema(this.options)
  }

  get server(): ApolloServer {
    return createServer(this.schema)
  }
}
