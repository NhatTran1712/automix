import { Service } from 'typedi'
import { Member, MeInput } from '../types'
import { Repository } from 'utils/services/repository'
import { get } from 'lodash'

@Service()
export class MemberService {
  constructor(private repo: Repository){
  }

  setMemberCollection() {
    this.repo.setCollection('members')
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

  addMember(member: MeInput): Member {
    console.log("MemberService -> addMember -> member", member)
    let newMember = new Member();

    newMember.id = member.id ? member.id : newMember.id;
    newMember.access = member.access ? member.access : newMember.access;
    newMember.branch = member.branch ? member.branch : newMember.branch;
    newMember.address = member.address ? member.address : newMember.address;
    newMember.employment = member.employment ? member.employment : newMember.employment;

    return Member.getConverter().fromFirestore(this.repo.add(newMember));
  }
}
