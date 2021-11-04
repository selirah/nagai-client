import { Order } from './Order'
import { DBUser } from './Auth'
import { Outlet } from './Outlet'

export type Delivery = {
  id: string
  orderId: string
  dispatchId: number
  isDelivered: boolean
  deliveryDate: Date
  coordinates: {
    lat: string
    lng: string
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

export type Tracking = {
  delivery: Delivery
  outlet: Outlet
}

export type DeliveryStats = {
  count: any
  delivered: any
}
