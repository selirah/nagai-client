import { Territory, DBUser } from 'classes'

export type UserTerritory = {
  id: number
  userId: number
  territories: Territory[]
  user: DBUser
}
