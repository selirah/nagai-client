import { DBUser } from 'classes'

export type Payment = {
  id: string
  saleId: string
  amount: number
  payer: string
  payerPhone: string
  payeeId: number
  payee: DBUser
  createdAt: Date
  updatedAt: Date
}
