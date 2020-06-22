import { AddressInterface } from './AddressInterface'
import { ObjectType } from 'type-graphql'

@ObjectType({ implements: AddressInterface })
export class Address extends AddressInterface {

}
