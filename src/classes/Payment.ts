import { DBUser } from './Auth'

export type Payment = {
  id: string
  saleId: string
  amount: number
  payer: string
  payerPhone: string
  payeeId: number
  comments: string
  payee: DBUser
  createdAt: Date
  updatedAt: Date
}

export type PaymentObj = {
  payments: Payment[]
  count: number
}

export type PaymentFields = {
  id?: string
  saleId: string
  amount: string | number
  payer: string
  payerPhone: string
  comments?: string
}

export type PaymentStats = {
  'Total Payment': string
  'Sale ID': string
}
