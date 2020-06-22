import { GraphQLDataSource } from '@apollo/gateway'
import { GraphQLRequestContext, GraphQLResponse } from 'apollo-server-types'
import Component from 'utils/Component'

export class ComponentGraphQlDataSource implements GraphQLDataSource {
  constructor(public readonly service: Component) {
    //
  }

  async process({ request, context }: Pick<GraphQLRequestContext<Record<string, unknown>>, 'request' | 'context'>): Promise<GraphQLResponse> {
    if (context.user) {
      request.extensions = {
        ...request.extensions,
        auth: {
          user: context.user,
        },
      }
    }

    return this.service.server.executeOperation(request)
  }
}
