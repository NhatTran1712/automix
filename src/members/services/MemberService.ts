import { Service } from 'typedi'
import { Member, MeInput } from '../types'
import { Repository } from 'utils/services/repository'
import { get } from 'lodash'

@Service()
export class MemberService {
  constructor(private repo: Repository){
  }

  setMemberCollection(branchId: string) {
    this.repo.setCollection(`branches/${branchId}/members`)
  }

  public async getMemberById(id: string): Promise<Member | null> {
    const converter = Member.getConverter(id)
    const memberSnap = await this.repo.getDoc<Member>(id, converter)
    return memberSnap ? memberSnap.data() : undefined;
  }

  public async getMembers(): Promise<Member[] | null> {
    const converter = Member.getConverter()
    const memberSnap = await this.repo.query<Member, any>(undefined, converter)
    const result = get(memberSnap, 'docs', []) as any[]
    return result.map((d: any) => {
      return { ...d.data(), id: d.id }
    })
  }

  async addMember(member: MeInput): Promise<Member> {
    let addedDoc;
    let newMember = new Member();

    newMember.access = member.access;
    newMember.branch = member.branch;
    newMember.address = member.address;
    newMember.employment = member.employment;
    
    if(member.id) {
      newMember.id = member.id;
      addedDoc = this.repo.setDoc(member.id, newMember)
    } else {
      addedDoc = await this.repo.addDoc(newMember);
    }
    return Member.getConverter().fromFirestore(addedDoc);
  }

  public deleteMemberById(id: string): string {
    return this.repo.deleteDoc(id);
  }
}