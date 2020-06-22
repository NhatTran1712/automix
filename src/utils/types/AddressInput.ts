import { AddressInterface } from './AddressInterface'
import { Field, InputType } from 'type-graphql'

@InputType()
export class AddressInput implements Partial<AddressInterface> {
  @Field()
  public street?: string

  @Field()
  public suburb?: string

  @Field()
  public postcode?: string

  @Field()
  public state?: string
}
