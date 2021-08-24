import { AbilityBuilder, Ability } from '@casl/ability'
import abilities from 'router/can.constants'
import { isUserLoggedIn } from 'utils'

export const userRoles = {
  admin: 'admin',
  agent: 'agent',
  dispatch: 'dispatch'
}

export default function defineAbilityFor() {
  const user = isUserLoggedIn()
  const { can, cannot, build } = new AbilityBuilder(Ability)

  if (user) {
    const { role } = JSON.parse(user)
    switch (role) {
      case userRoles.admin:
        can('read', abilities.Home)
        can('read', abilities.Categories)
        can('read', abilities.Manufacturers)
        can('read', abilities.Products)
        can('read', abilities.Stock)
        can('read', abilities.Territories)
        break
      case userRoles.agent:
        cannot('read', abilities.Home)
        cannot('read', abilities.Categories)
        cannot('read', abilities.Manufacturers)
        cannot('read', abilities.Products)
        break
      case userRoles.dispatch:
        cannot('read', abilities.Home)
        cannot('read', abilities.Categories)
        cannot('read', abilities.Manufacturers)
        cannot('read', abilities.Products)
        break
    }
  }
  return build()
}
