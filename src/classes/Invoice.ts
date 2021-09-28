import { Tax, Order } from 'classes'

export type Invoice = {
  id: string
  invoiceNumber: string
  orderNumber: string
  taxes: Tax[]
  discount: number
  deliveryFee: number
  finalAmount: number
  order: Order
  createdAt: Date
  updatedAt: Date
}

export type InvoiceObj = {
  invoices: Invoice[]
  count: number
}

export type InvoiceFields = {
  id?: string
  invoiceNumber: string
  orderNumber: string
  taxes: Tax[]
  discount: string
  deliveryFee: string
  finalAmount: string
}
