import { createSelectorHook } from 'react-redux'
import { ApplicationState } from './root-reducer'
import { store } from '../index'

export const Selector = createSelectorHook<ApplicationState>()

export type Dispatch = typeof store.dispatch
