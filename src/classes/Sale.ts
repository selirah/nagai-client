import { Invoice } from './Invoice'
import { Order } from './Order'
import { Payment } from './Payment'

export type Sale = {
  id: string
  orderId: string
  invoiceId: string
  amount: string
  amountPaid: string
  amountLeft: string
  status: string
  comments: string
  order: Order
  invoice: Invoice
  payments: Payment[]
  createdAt: Date
  updatedAt: Date
}

export type SaleObj = {
  sales: Sale[]
  count: number
}

export type SaleFields = {
  id?: string
  orderId: string
  invoiceId: string
  amount: string
  amountPaid: string
  amountLeft: string
  status?: string
  comments?: string
}

export const SaleStatus = {
  PENDING: 'PENDING',
  FAILED: 'FAILED',
  PAYING: 'PAYING',
  ALL: 'ALL',
  PAID: 'PAID'
}

export type SaleStats = {
  'Total Amount': any
  'Amount Paid': any
  'Amount Left': any
}
