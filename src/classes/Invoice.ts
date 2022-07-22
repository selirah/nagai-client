import { Tax } from './Tax'
import { Order } from './Order'
import { Outlet } from './Outlet'

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

export type InvoiceStats = {
  'Total Amount': string
  'Order ID': string
}
