import { Territory } from 'classes'

export type Outlet = {
  id: number
  ownerName: string
  outletName: string
  mobile: string
  telephone: string
  territoryId: number
  email: string
  locality: string
  barcode: string
  subLocality: string
  landmark: string
  photo: string
  region: string
  coordinates: {
    lat: string
    lng: string
  }
  territory: Territory
  createdAt: Date
  updatedAt: Date
}

export type OutletObj = {
  outlets: Outlet[]
  count: number
}

export type OutletFields = {
  id?: number
  ownerName: string
  outletName: string
  mobile: string
  telephone: string
  barcode: string
  territoryId: number
  region: any
  email: string
  locality: string
  subLocality: string
  landmark: string
  territory: string
  coordinates: {
    lat: string
    lng: string
  }
}

export type OutletStats = {
  'Total Outlets': string
  Region: string
}
