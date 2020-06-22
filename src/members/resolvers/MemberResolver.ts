import { Query, Resolver } from 'type-graphql'
import { Member } from '../types'
import { MemberService } from '../services'

@Resolver(Member)
export class MemberResolver {
  constructor(
    private readonly members: MemberService,
  ) {
    //
  }

  @Query(returns => Member, { nullable: true })
  async me(): Promise<Member | null> {
    return this.members.getMemberById()
  }
}
