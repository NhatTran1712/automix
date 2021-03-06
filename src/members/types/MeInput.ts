import { Field, ID, InputType } from 'type-graphql'
import { IsEnum } from 'class-validator'
import { Access, Branch } from 'utils'
import { EmploymentInput, AddressInput } from 'utils/types'
import { Member } from '../types'

@InputType()
export class MeInput implements Partial<Member> {
  @Field(type => ID, { nullable: true })
  id?: string

  @Field(type => Access)
  @IsEnum(Access)
  access: Access

  @Field(type => Branch)
  @IsEnum(Branch)
  branch: Branch

  @Field({ nullable: true })
  address?: AddressInput

  @Field({ nullable: true })
  employment?: EmploymentInput
}
