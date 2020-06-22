import { Field, ObjectType } from 'type-graphql'
import { Node } from './Node'

@ObjectType()
export class StaticAsset extends Node {
  @Field()
  public id!: string

  @Field()
  public path!: string

  @Field()
  public url!: string

  @Field({ nullable: true })
  public name?: string

  @Field()
  public mime!: string
}
