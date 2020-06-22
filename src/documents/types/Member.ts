import { Directive, Field, ID, ObjectType } from 'type-graphql'

@Directive('@extends')
@Directive('@key(fields: "id")')
@ObjectType()
export class Member {
  @Directive('@external')
  @Field(type => ID)
  id: string;

  constructor(
    id: string,
  ) {
    this.id = id
  }
}
