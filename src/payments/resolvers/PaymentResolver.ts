import { Mutation, Resolver } from 'type-graphql'
import { Payment } from '../types'
import { PaymentService } from '../services'

@Resolver(Payment)
export class PaymentResolver {
  constructor(
    private readonly paymentService: PaymentService,
  ) {
    //
  }

  @Mutation(returns => Payment)
  async createPayment(): Promise<Payment> {
    return this.paymentService.makePayment()
  }
}
