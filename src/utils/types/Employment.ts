import { Address } from './Address'
import { Field, ObjectType } from 'type-graphql'

@ObjectType()
export class Employment {
  @Field()
  public employer?: string

  @Field()
  public permanence?: string

  @Field()
  public averageHours?: string

  @Field()
  public level?: string

  @Field(type => Address)
  public address?: Address
}
