import { UserTerritory } from 'classes'

export type User = {
  id: number
  email: string
  phone: string
  password: string
  firstName: string
  lastName: string
  avatar: string
  isVerified: boolean
  role: string
  createdAt: Date
  updatedAt: Date
  exp: number
  iat: number
}

export type Auth = {
  user: User
  token: string
}

export type LoginFields = {
  email: string
  password: string
  rememberMe?: boolean
}

export type RegisterFields = {
  email: string
  phone: string
  password: string
  confirmPassword: string
  terms: boolean
}

export type VerifyFields = {
  code: string
}

export type ResetResendFields = {
  email: string
}

export type DBUser = {
  id: number
  email: string
  phone: string
  password: string
  firstName: string
  lastName: string
  avatar: string
  isVerified: boolean
  role: string
  userTerritories: UserTerritory
  createdAt: Date
  updatedAt: Date
}

export type UserObj = {
  users: DBUser[]
  count: number
}

export type UserFields = {
  id?: number
  email: string
  phone: string
  firstName: string
  lastName: string
  avatar?: string
  isVerified: boolean
  role: string
}

export const Roles = [
  {
    role: 'admin'
  },
  {
    role: 'agent'
  },
  {
    role: 'dispatch'
  }
]

export type ChangePassword = {
  oldPassword: string
  newPassword: string
  id: number
}

export type Company = {
  id: number
  name: string
  email: string
  phone: string
  smsID: string
  logo: string
}
