import { Territory, Region } from 'classes'

export type Outlet = {
  id: number
  ownerName: string
  outletName: string
  mobile: string
  telephone: string
  territoryId: number
  email: string
  locality: string
  subLocality: string
  landmark: string
  region: Region
  photo: string
  coordinates: {
    lat: number
    lng: number
  }
  territory: Territory
  createdAt: Date
  updatedAt: Date
}
