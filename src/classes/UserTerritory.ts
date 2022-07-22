import { Territory } from './Territory'
import { DBUser } from './Auth'

export type UserTerritory = {
  id: number
  userId: number
  territories: Territory[]
  user: DBUser
}

export type UserTerritoryObj = {
  userTerritories: UserTerritory[]
  count: number
}

export type UserTerritoryFields = {
  id?: number
  userId: number
  territories: Territory[]
}
