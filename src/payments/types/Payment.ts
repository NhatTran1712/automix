import { Directive, Field, ID, ObjectType } from 'type-graphql'

@Directive('@key(fields: "id")')
@ObjectType()
export class Payment {
  @Field(type => ID, { nullable: true })
  public id?: string
}
