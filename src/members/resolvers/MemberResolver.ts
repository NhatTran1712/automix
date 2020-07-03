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
    @Ctx() context: any,
  ): Promise<Member | null> {
    const branchId = get(context, 'auth.user.branch', '');

    if (branchId) {
      this.memberService.setMemberCollection(branchId);
      return await this.memberService.getMemberById(id);
    }
    throw new Error(`Branch ${branchId} is missing`);
  }

  @Authorized(Access.ADMIN)
  @Query(returns => MemberConnection)
  async getMembers(
    @Args(type => GetAllMembersArguments) arguments_: GetAllMembersArguments,
    @Ctx() context: any,
  ): Promise<Connection<Member>> {
    const branchId = get(context, 'auth.user.branch', '');

    if (branchId) {
      this.memberService.setMemberCollection(branchId);
      const members = await this.memberService.getMembers()
      return connectionFromArray(members || [], arguments_)
    }
    throw new Error(`Branch ${branchId} is missing`);
  }

  @Authorized(Access.ADMIN)
  @Mutation(returns => Member)
  async createMember(
    @Args() memberInput: MeInput,
    @Ctx() context: any,
  ): Promise<Member> {
    const branchId = get(context, 'auth.user.branch', '');

    if(branchId) {
      this.memberService.setMemberCollection(branchId)
      return await this.memberService.addMember(memberInput);
    }
    throw new Error(`Branch ${branchId} is missing`);
  }

  @Authorized(Access.ADMIN)
  @Mutation(returns => String)
  deleteMember(
    @Arg('id') id: string,
    @Ctx() context: any,
  ) {
    const branchId = get(context, 'auth.user.branch', '');

    if(branchId) {
      this.memberService.setMemberCollection(branchId);
      return `delete id: ${this.memberService.deleteMemberById(id)} successfully`;
    }
    throw new Error(`Branch ${branchId} is missing`);
  }
}
