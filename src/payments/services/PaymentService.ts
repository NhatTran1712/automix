import { Service } from 'typedi'
import { Payment } from '../types'

@Service()
export class PaymentService {
  makePayment(): Payment {
    return new Payment()
  }
}
