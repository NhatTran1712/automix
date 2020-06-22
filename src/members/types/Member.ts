import { Directive, Field, ID, ObjectType } from 'type-graphql'
import { Access, Branch } from 'utils'
import { Address, Employment } from 'utils/types'
import { connectionTypes } from '../../utils/connectionTypes'

@Directive('@key(fields: "id")')
@ObjectType()
export class Member {
  @Field(type => ID)
  public id: string

  @Field(type => Access)
  public access: Access

  @Field(type => Branch)
  public branch: Branch

  @Field(type => Address, { nullable: true })
  public address?: Address

  // TODO: Replace with with actual location support
  @Field(type => Employment, { nullable: true })
  public employment?: Employment

  static getConverter(id?: string) {
    return {
      toFirestore() {
        return {}
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
  // constructor() {
  //   this.id = '123-123-123-123'
  //   this.access = Access.MEMBER
  //   this.branch = Branch.SA
  // }
}

export const { Connection: MemberConnection, Edge: MemberConnectionEdge } = connectionTypes('Member', Member)
