import { ApolloServer } from 'apollo-server-express'
import { buildFederatedSchema } from '@apollo/federation'
import { GraphQLSchemaModule } from 'apollo-graphql'
import { ApolloServerPlugin } from 'apollo-server-plugin-base'
import { GraphQLSchema } from 'graphql'

const AuthPlugin: ApolloServerPlugin = {
  requestDidStart(requestContext) {
    if (requestContext.request.extensions) {
      requestContext.context.auth = requestContext.request.extensions.auth
    }
  },
}

export const createServer = (schema: GraphQLSchemaModule | GraphQLSchema): ApolloServer => new ApolloServer({
  schema: schema instanceof GraphQLSchema ? schema : buildFederatedSchema([schema]),
  plugins: [AuthPlugin],
})
