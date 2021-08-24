import { Outlet, DBUser } from 'classes'

export type Territory = {
  id: number
  locality: string
  coordinates: {
    lat: number
    lng: number
  }
  regionId: number
  outlets: Outlet[]
  users: DBUser[]
  region: Region
  createdAt: Date
  updatedAt: Date
}

export type TerritoryObj = {
  territories: Territory[]
  count: number
}

export type TerritoryFields = {
  id?: number
  locality: string
  coordinates: {
    lat: number
    lng: number
  }
  regionId: number
}

export type Region = {
  id: number
  region: string
  abbreviation: string
  capital: string
}
