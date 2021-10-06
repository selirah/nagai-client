import { Order, DBUser } from 'classes'

export type Delivery = {
  id: string
  orderId: string
  dispatchId: number
  isDelivered: boolean
  deliveryDate: Date
  coordinates: {
    lat: number
    lng: number
  }
  comments: string
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
  orderId: string
  dispatchId: number
  isDelivered?: boolean
  deliveryDate?: Date
  coordinates?: {
    lat: number
    lng: number
  }
  comments?: string
}
