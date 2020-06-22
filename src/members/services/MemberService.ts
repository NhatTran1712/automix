import { Service } from 'typedi'
import { Member } from '../types'
import { Repository } from 'utils/services/repository'

@Service()
export class MemberService {
  private me: Member | null

  constructor(private repo: Repository) {
    this.me = new Member() // TEMP
  }

  public async getMemberById(id: string): Promise<Member | null> {
    return this.me
  }

  public async setMe(newMe: Member): Promise<void> {
    this.me = newMe
  }
}
