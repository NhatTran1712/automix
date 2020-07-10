import { Field, InterfaceType } from 'type-graphql'

@InterfaceType()
export abstract class AddressInterface {
  @Field()
  public street?: string

  @Field()
  public suburb?: string

  @Field()
  public postcode?: string

  @Field()
  public state?: string
}