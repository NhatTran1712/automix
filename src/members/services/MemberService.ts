import { Service } from 'typedi'
import { Member, MeInput } from '../types'
import { Repository } from 'utils/services/repository'
import { get } from 'lodash'
import { members } from 'members'

@Service()
export class MemberService {
  // private me: Member | null

  constructor(private repo: Repository) {
    // this.me = new Member() // TEMP
  }

  setBranch(branchId: string) {
    // this.me = newMe
    this.repo.setCollection(`branches/${branchId}/members`)
  }

  public async getMemberById(id: string): Promise<Member | null> {
    // return this.me
    const converter = Member.getConverter(id)
    const memberSnap = await this.repo.getDoc<Member>(id, converter)

    return memberSnap ? memberSnap.data() : undefined
  }

  public async getMembers(): Promise<Member[] | null> {
    const converter = Member.getConverter()
    const memberSnap = await this.repo.query<Member, any>(undefined, converter)
    const result = get(memberSnap, 'docs', []) as any[]
    
    return result.map((d: any) => {
      return { ...d.data(), id: d.id }
    })
  }

  setMember(member: MeInput) {
    let newMember = new Member();

    newMember.id = member.id;
    // newMember.access = member.access;
    // newMember.branch = member.branch;
    // newMember.address = member.address;
    // newMember.employment = member.employment;

    return this.repo.addData(newMember);
  }
}
