import { createContext } from 'react'

import { createContextualCan } from '@casl/react'

export const AbilityContext = createContext<any>(null)

export const Can = createContextualCan(AbilityContext.Consumer)
