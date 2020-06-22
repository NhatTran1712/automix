import { Field, ObjectType } from 'type-graphql'
import { StaticAsset } from './StaticAsset'

@ObjectType()
export class StaticResource {
  @Field({ nullable: true })
  public url?: string

  @Field(type => StaticAsset, { nullable: true })
  public asset?: StaticAsset
}
