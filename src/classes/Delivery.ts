import { Order, DBUser } from 'classes'

export type Delivery = {
  id: string
  deliveryNumber: string
  orderNumber: string
  dispatchId: number
  isDelivered: boolean
  deliveryDate: Date
  reason: string
  order: Order
  dispatch: DBUser
  createdAt: Date
  updatedAt: Date
}

export type DeliveryObj = {
  deliveries: Delivery[]
  count: number
}

export type DeliveryFields = {
  id?: string
  deliveryNumber: string
  orderNumber: string
  dispatchId: number
  isDelivered: boolean
  deliveryDate: Date
  reason: string
}
