import { MemberService } from './MemberService'
import { Member } from '../types'

describe('member service', () => {
  let service: MemberService

  beforeEach(() => {
    service = new MemberService()
  })

  it('can get members', async () => {
    expect(await service.getMemberById()).toStrictEqual(new Member())
  })
})
