import { Product } from './Product'
import { Outlet } from './Outlet'
import { DBUser } from './Auth'
import { Invoice } from './Invoice'
import { Delivery } from './Delivery'

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
  ALL: 'ALL',
  DISPATCH: 'DISPATCH'
}

export type OrderStats = {
  count: string
  status: string
}
