import { Directive, Field, ID, ObjectType } from 'type-graphql'
import { Access, Branch, UUID } from 'utils'
import { Address, Employment, Node } from 'utils/types'
import { connectionTypes } from '../../utils/connectionTypes'
import { IsEnum } from 'class-validator'

@Directive('@key(fields: "id")')
@ObjectType()
export class Member extends Node {
  @Field(type => ID)
  public id: string

  @Field(type => Access)
  @IsEnum(Access)
  public access: Access

  @Field(type => Branch)
  @IsEnum(Access)
  public branch: Branch

  @Field(type => Address, { nullable: true })
  public address?: Address

  // TODO: Replace with with actual location support
  @Field(type => Employment, { nullable: true })
  public employment?: Employment

  static getConverter(id?: UUID) {
    return {
      toFirestore(data: Member) {
        return {
        }
      },
      fromFirestore(data: FirebaseFirestore.DocumentData) {
        return {
          id: id || data.id,
          access: data.access,
          branch: data.branch,
          address: data.address,
          employment: data.employment,
        } as Member
      },
    }
  }
}

export const { Connection: MemberConnection, Edge: MemberConnectionEdge } = connectionTypes('Member', Member)
