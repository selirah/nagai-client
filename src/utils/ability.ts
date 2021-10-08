import { AbilityBuilder, Ability } from '@casl/ability'
import abilities from 'router/can.constants'
import { isUserLoggedIn } from 'utils'

export const userRoles = {
  admin: 'admin',
  agent: 'agent',
  dispatch: 'dispatch',
  all: 'all'
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
        can('read', abilities.Outlets)
        can('read', abilities.Users)
        can('read', abilities.Orders)
        can('read', abilities.Invoices)
        can('read', abilities.Deliveries)
        can('read', abilities.Sales)
        break
      case userRoles.agent:
        can('read', abilities.Home)
        can('read', abilities.Categories)
        can('read', abilities.Manufacturers)
        can('read', abilities.Products)
        can('read', abilities.Stock)
        can('read', abilities.Territories)
        can('read', abilities.Outlets)
        cannot('read', abilities.Users)
        can('read', abilities.Orders)
        can('read', abilities.Invoices)
        can('read', abilities.Deliveries)
        can('read', abilities.Sales)
        break
      case userRoles.dispatch:
        can('read', abilities.Home)
        cannot('read', abilities.Categories)
        cannot('read', abilities.Manufacturers)
        cannot('read', abilities.Products)
        cannot('read', abilities.Stock)
        cannot('read', abilities.Territories)
        cannot('read', abilities.Outlets)
        cannot('read', abilities.Users)
        can('read', abilities.Orders)
        cannot('read', abilities.Invoices)
        can('read', abilities.Deliveries)
        cannot('read', abilities.Sales)
        break
    }
  }
  return build()
}
