import { Product, Outlet, DBUser } from 'classes'

export type Item = {
  product: Product
  unit: string
  unitPrice: number
  quantity: number
}

export type Order = {
  id: string
  items: Item[]
  vat: number
  discount: number
  outletId: number
  agentId: number
  outlet: Outlet
  agent: DBUser
  createdAt: Date
  updatedAt: Date
}

export type OrderObj = {
  orders: Order[]
  count: number
}

export type OrderFields = {
  id?: string
  items: Item[]
  vat: string | number
  discount: string | number
  outletId: number | string
  agentId: number | string
}
