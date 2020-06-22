import { ArgsType, ClassType, Field, ID, Int, ObjectType } from 'type-graphql'
import * as Relay from 'graphql-relay'
import { Max, Min } from 'class-validator'
import { Node } from './types'
import atob from 'atob'
import btoa from 'btoa'

export type ConnectionCursor = Relay.ConnectionCursor

export const PAGINATION_DEFAULT = 10

export const PAGINATION_LIMIT = 100

@ObjectType()
export class PageInfo implements Relay.PageInfo {
  @Field({ nullable: true })
  hasNextPage?: boolean

  @Field({ nullable: true })
  hasPreviousPage?: boolean

  @Field(type => ID)
  startCursor?: ConnectionCursor

  @Field(type => ID)
  endCursor?: ConnectionCursor
}

@ArgsType()
export class ConnectionArguments implements Relay.ConnectionArguments {
  @Field(type => ID, { nullable: true, description: 'Paginate before opaque cursor' })
  before?: ConnectionCursor

  @Field(type => ID, { nullable: true, description: 'Paginate after opaque cursor' })
  after?: ConnectionCursor

  @Field(type => Int, {
    nullable: true,
    description: `Paginate first. Max ${PAGINATION_LIMIT}. Default: ${PAGINATION_DEFAULT}`,
    defaultValue: PAGINATION_DEFAULT,
  })
  @Min(1)
  @Max(PAGINATION_LIMIT)
  first?: number

  @Field(type => Int, {
    nullable: true,
    description: `Paginate last. Max ${PAGINATION_LIMIT}. Default: ${PAGINATION_DEFAULT}`,
    defaultValue: PAGINATION_DEFAULT,
  })
  @Min(1)
  @Max(PAGINATION_LIMIT)
  last?: number
}

export function connectionTypes<T extends ClassType>(name: string, nodeType: T): {
  Connection: ClassType<Relay.Connection<T>>
  Edge: ClassType<Relay.Edge<T>>
} {
  @ObjectType(`${name}Edge`)
  class Edge implements Relay.Edge<T> {
    @Field(() => nodeType)
    node!: T

    @Field(type => ID, { description: 'Used in `before` and `after` args' })
    cursor!: ConnectionCursor
  }

  @ObjectType(`${name}Connection`)
  class Connection implements Relay.Connection<T> {
    @Field()
    pageInfo!: PageInfo

    @Field(() => [Edge])
    edges!: Edge[]
  }

  return {
    Connection,
    Edge,
  }
}

export type { Connection } from 'graphql-relay'

export {
  connectionFromArray,
  connectionFromPromisedArray,
  connectionFromArraySlice,
  connectionFromPromisedArraySlice,
} from 'graphql-relay'

export function encodeCursor<T extends Node>(node: T, orderProperty: keyof T): string {
  return btoa(`${node.id}:${orderProperty}:${node[orderProperty]}`)
}

export function decodeCursor(cursor: string): {
  id?: string
  orderProp?: string
  orderProperty?: string
  orderValue?: string
} {
  const [id, orderProperty, orderValue] = atob(cursor).split(':')

  return { id, orderProp: orderProperty, orderValue }
}

export function connectionFromNodes<T extends Node>(nodes: T[], orderProperty: keyof T = 'id', meta: PageInfo = {}): Relay.Connection<T> {
  const edges = nodes.map((node) => ({
    cursor: encodeCursor(node, orderProperty),
    node: node,
  }))

  const pageInfo = {
    startCursor: edges.length > 0 ? edges[0].cursor : undefined,
    endCursor: edges.length > 0 ? edges[edges.length - 1].cursor : undefined,
    ...meta,
  }

  return { pageInfo, edges }
}

