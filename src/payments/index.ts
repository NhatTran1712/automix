import Component from '../utils/Component'
import { PaymentResolver } from './resolvers'
import { MemberPaymentsResolver } from './resolvers/MemberPaymentsResolver'

export const payments = new Component(
  [PaymentResolver, MemberPaymentsResolver],
)
