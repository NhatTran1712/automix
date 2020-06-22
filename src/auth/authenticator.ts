import { Request } from 'express'
import { Access, AuthContext, Branch } from 'utils'

export const authenticate = (_request: Request): AuthContext => {
  return {
    id: '123-123-123-123',
    access: Access.ADMIN,
    branch: Branch.SA,
  }
}
