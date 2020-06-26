import { Field, ID, ArgsType } from 'type-graphql'
import { IsEnum } from 'class-validator'
import { Access, Branch } from 'utils'
import { EmploymentInput, AddressInput } from 'utils/types'
import { Member } from '../types'

@ArgsType()
export class MeInput implements Partial<Member> {
  @Field(type => ID, { nullable: true })
  id?: string

  @Field(type => Access, { nullable: true })
  @IsEnum(Access)
  access?: Access

  @Field(type => Branch, { nullable: true })
  @IsEnum(Branch)
  branch?: Branch

  @Field({ nullable: true })
  address?: AddressInput

  @Field({ nullable: true })
  employment?: EmploymentInput
}
