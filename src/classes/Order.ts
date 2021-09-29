import { Product, Outlet, DBUser, Invoice, Delivery } from 'classes'

export type Item = {
  product: Product
  unit: string
  unitPrice: number
  quantity: number
  sku: string
}

export type Order = {
  id: string
  items: Item[]
  orderNumber: string
  orderTotal: number
  outletId: number
  agentId: number
  status: string
  comments: string
  outlet: Outlet
  agent: DBUser
  invoice: Invoice
  delivery: Delivery
  createdAt: Date
  updatedAt: Date
}

export type OrderObj = {
  orders: Order[]
  count: number
}

export type OrderFields = {
  id?: string
  orderNumber: string
  items: Item[]
  status?: string
  orderTotal: number | string
  outletId: number | string
  agentId: number | string
  comments?: string
}

export const OrderStatus = {
  PENDING: 'PENDING',
  DELIVERED: 'DELIVERED',
  FAILED: 'FAILED',
  TRANSIT: 'TRANSIT',
  ALL: 'ALL'
}
