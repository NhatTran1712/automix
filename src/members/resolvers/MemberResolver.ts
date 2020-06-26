import { Query, Resolver, Authorized, Arg, Ctx, Args, Mutation } from 'type-graphql'
import { Member, MemberConnection, MeInput } from '../types'
import { MemberService } from '../services'
import { Access } from 'utils/AuthContext'
import { get } from 'lodash';
import { GetAllMembersArguments } from 'members/types/GetAllMembersArguments';
import { Connection, connectionFromArray } from 'utils/connectionTypes';

@Resolver(Member)
export class MemberResolver {
  constructor(
    private readonly memberService: MemberService,
  ) {}
  
  @Authorized(Access.ADMIN)
  @Query(returns => Member, { nullable: true })
  async getMember(
    @Arg('id') id: string,
    // @Ctx() context: any,
  ): Promise<Member | null> {
    this.memberService.setMemberCollection();
    return await this.memberService.getMemberById(id);
  }

  @Authorized(Access.ADMIN)
  @Query(returns => MemberConnection)
  async getMembers(
    @Args(type => GetAllMembersArguments) arguments_: GetAllMembersArguments,
    // @Ctx() context: any,
  ): Promise<Connection<Member>> {
    this.memberService.setMemberCollection()
    console.log("MemberResolver 1")
    const members = await this.memberService.getMembers()
    console.log("MemberResolver -> members", members)
    return connectionFromArray(members || [], arguments_)
  }

  @Authorized(Access.ADMIN)
  @Mutation(returns => Member)
  async createMember(
    @Args() memberInput: MeInput
  ): Promise<Member> {
    console.log("MemberResolver -> memberInput", memberInput)
    this.memberService.setMemberCollection()
    return this.memberService.addMember(memberInput);
  }
}
