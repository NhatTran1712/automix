import { Field, ID, InterfaceType } from 'type-graphql'

@InterfaceType()
export abstract class Node {
  @Field(type => ID)
  public id?: string
}
