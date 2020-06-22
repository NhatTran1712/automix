import { StaticResource } from './utils/types/StaticResource'

type Member = {
  memberNumber: number
  firstName: string
  lastName: string
  email: string
  mobile: string
  postcode: string
  dateOfBirth: Date
  hasAddress: boolean
  locations: [
    {
      isDelegate: boolean
      isOhs: boolean
      level: string
      permanence: 'permanent' | 'casual'
      location: Location
    }
  ]
  notifications: Notification[]
  orders: Order[]
}

// @ts-ignore
type Location = {
  name: string
  members: Member[]
  representative: Representative
  events: Event[]
  venues: Venue[]
  branch: Branch
  payAndConditions: PayAndConditions[]
  group: Group
}

enum Industry {
  RETAIL = 'RETAIL',
  WAREHOUSING = 'WAREHOUSING',
  FAST_FOOD = 'FAST_FOOD',
}

type Group = {
  name: string
  locations: Location[]
  industries: Industry[]
  payAndConditions: PayAndConditions[]
  parent: Group
  children: Group[]
}

type PayAndConditions = {
  id: string
  name: string
  eba: EBA
  revisions: Revision[]
}

type Revision = {
  activeFrom: Date
  ratesOfPay: RateOfPay[]
  conditions: Condition[]
  alerts: Alert[]
}

type RateOfPay = {
  name: string // Level 1
  rates: Rate[] // First rate contains the base permanent and casual rate
  ages: [
    {
      name: string
      minAge?: number
      maxAge?: number
      modifier: number
      rates: Rate[]
    }
  ]
}

type Rate<TypesOfRate = 'permanent' | 'casual'> = {
  name: string
  types: [
    {
      type: TypesOfRate
      modifier: number // Percentage of base rate (perm or casual)
      autoValue: number // Default value, pre-filled when the pay-rate is saved
      manualValue?: number // Specific value, if the modifier doesn't provide the exact number
    }
  ]
}

type EBA = {
  id: string
  name: string
  file: StaticResource
}

// @ts-ignore
type Notification = {

}

type Order = {

}

// @ts-ignore
type Event = {

}

type Representative = {
  id: string
  firstName?: string
  lastName?: string
  email?: string
  phone?: string
  image?: StaticResource
  createdAt: string
  updatedAt: string
  deletedAt?: string
}

type Venue = {

}

type Branch = {

}

type Condition = {

}

type Alert = {

}

interface PurchasableInterface {

}

type Ticket = PurchasableInterface & {

}


type Purchasable = {
  origin: PurchasableInterface
}
