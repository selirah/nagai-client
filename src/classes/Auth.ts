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
  createdAt: Date
  updatedAt: Date
}
