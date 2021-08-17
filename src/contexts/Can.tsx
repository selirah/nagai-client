import { createContext } from 'react'
import { Ability } from '@casl/ability'

import { createContextualCan } from '@casl/react'

const ability = new Ability()

export const AbilityContext = createContext(ability)

export const Can = createContextualCan(AbilityContext.Consumer)
