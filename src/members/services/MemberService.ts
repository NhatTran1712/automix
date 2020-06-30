import { Service } from 'typedi'
import { Member, MeInput } from '../types'
import { Repository } from 'utils/services/repository'
import { get } from 'lodash'

@Service()
export class MemberService {
  constructor(private repo: Repository){
  }

  setMemberCollection(branchId: string) {
    // this.repo.setCollection('members')
    this.repo.setCollection(`branches/${branchId}/members`)
  }

  public async getMemberById(id: string): Promise<Member | null> {
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

  addMember(member: MeInput): Member | null {
    console.log("MemberService -> addMember -> member", member)
    let newMember = new Member();

    newMember.id = member.id ? member.id : newMember.id;
    newMember.access = member.access;
    newMember.branch = member.branch;
    newMember.address = member.address;
    newMember.employment = member.employment;
    return this.repo.add(newMember);
  }

  public deleteMemberById(id: string): Boolean {
    return this.repo.deleteDoc(id);
  }
}
