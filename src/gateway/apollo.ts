import { ApolloGateway, RemoteGraphQLDataSource } from '@apollo/gateway'
import { ComponentGraphQlDataSource } from './ComponentGraphQlDataSource'
import { ApolloServer, ApolloServerExpressConfig } from 'apollo-server-express'
import { componentServices, components } from './components'
import { authenticate } from 'auth'

export const gateway = new ApolloGateway({
  serviceList: [...componentServices],
  buildService: (definition) => definition.name in components
    ? new ComponentGraphQlDataSource(components[definition.name])
    : new RemoteGraphQLDataSource(definition),
})

export const context: ApolloServerExpressConfig['context'] = ({ req }) => {
  const user = authenticate(req)

  return { user }
}

export const server = new ApolloServer({
  gateway,
  context,
  subscriptions: false,
})
