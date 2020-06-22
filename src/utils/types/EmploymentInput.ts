import { Field, InputType } from 'type-graphql'
import { AddressInput } from './AddressInput'
import { Employment } from './Employment'

@InputType()
export class EmploymentInput implements Partial<Employment> {
  @Field()
  public employer?: string

  @Field()
  public permanence?: string

  @Field()
  public averageHours?: string

  @Field()
  public level?: string

  @Field(type => AddressInput)
  public address?: AddressInput
}
