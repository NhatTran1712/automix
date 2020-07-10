import { Directive, Field, ID, ObjectType } from 'type-graphql'
import { connectionTypes } from '../../utils/connectionTypes'
import { StaticResource } from 'utils/types/StaticResource'
import { Member } from './Member'
import { UUID } from 'utils'
import { Node } from 'utils/types'
import { get } from 'lodash'

@ObjectType()
export class DocumentField {
    @Field()
    key: string;

    @Field()
    value: string;
}

@Directive('@key(fields: "id")')
@ObjectType()
export class Document extends Node {
  @Field(type => ID)
  public id: string

  @Field(type => Member)
  public member: Member

  @Field(type => [DocumentField])
  public fields: DocumentField[]

  @Field(type => StaticResource, { nullable: true })
  public signature?: StaticResource

  @Field(type => StaticResource, { nullable: true })
  public pdf?: StaticResource

  static getConverter(id?: UUID) {
    return {
      toFirestore() {
        return {}
      },
      fromFirestore(data: FirebaseFirestore.DocumentData) {
        return {
          id: id || data.id,
          fields: Object.keys(data.fields).map(key => {
            return { key, value: data.fields[key] } as DocumentField
          }),
          member: {
            id: get(data, 'member.id', ''),
          },
          pdf: data.pdf,
          signature: data.signature,
        } as Document
      },
    }
  }
}

export const { Connection: DocumentConnection, Edge: DocumentConnectionEdge } = connectionTypes('Document', Document)
