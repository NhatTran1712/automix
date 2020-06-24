import { Query, Resolver, Authorized, Arg, Ctx, Args, Mutation, InputType } from 'type-graphql'
import { Member, MemberConnection, MeInput } from '../types'
import { MemberService } from '../services'
import { Access } from 'utils/AuthContext'
import { get } from 'lodash';
import { GetAllMembersArguments } from 'members/types/GetAllMembersArguments';
import { Connection, connectionFromArray } from 'utils/connectionTypes';
import { members } from 'members';

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
    let member: Member;

    if (branchId) {
      this.memberService.setBranch(branchId);
      member = await this.memberService.getMemberById(id);
    }
    return member;
  }

  @Authorized(Access.ADMIN)
  @Query(returns => MemberConnection)
  async getMembers(
    @Args(type => GetAllMembersArguments) arguments_: GetAllMembersArguments,
    @Ctx() context: any,
  ): Promise<Connection<Member>> {
    const branchId = get(context, 'auth.user.branch', '')

    if (branchId) {
      this.memberService.setBranch(branchId)
      const members = await this.memberService.getMembers()
      return connectionFromArray(members || [], arguments_)
    }
    throw new Error('Branch is missing')
  }

  @Authorized(Access.ADMIN)
  @Mutation(returns => Member)
  async createMember(
    @Args() memberInput: MeInput,
    @Ctx() context: any,
  ) {
    const branchId = get(context, 'auth.user.branch', '');
    
    if (branchId) {
      this.memberService.setBranch(branchId)
      const newMember = this.memberService.setMember(memberInput);

      return newMember;
    }
    
  }
}
