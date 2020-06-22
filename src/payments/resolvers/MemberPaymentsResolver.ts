import { FieldResolver, Resolver } from 'type-graphql'
import { Payment } from '../types'
import { Member } from '../types/Member'

@Resolver(of => Member)
export class MemberPaymentsResolver {
  @FieldResolver(type => [Payment])
  async payments(): Promise<Payment[]> {
    return []
  }
}
