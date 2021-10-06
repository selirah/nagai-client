import { Tax, Order, Outlet } from 'classes'

export type Invoice = {
  id: string
  orderId: string
  outletId: number
  taxes: Tax[]
  discount: string
  deliveryFee: string
  finalAmount: string
  order: Order
  outlet: Outlet
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
  outletId: number
  taxes: Tax[]
  discount: string
  deliveryFee: string
  finalAmount: string
}
