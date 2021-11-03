import { Outlet } from 'classes'

export type Territory = {
  id: number
  locality: string
  regionId: number
  description: string
  outlets: Outlet[]
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
  regionId: number | string
  description: string
}

export type Region = {
  id: number
  region: string
  abbreviation: string
  capital: string
}

export type TerritoryStats = {
  'Total Territories': string
  Region: string
}
