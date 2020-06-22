import { registerEnumType } from 'type-graphql'

export type UUID = string

export enum Branch {
  SA = 'SA',
}

export enum Access {
  MEMBER = 'MEMBER',
  ADMIN = 'ADMIN',
}

export type AuthContext = {
  id: UUID | null
  branch: Branch | null
  access: Access | null
}

registerEnumType(Branch, {
  name: 'Branch',
  description: 'SDA Branch',
})

registerEnumType(Access, {
  name: 'Access',
  description: 'SDA Access',
})
