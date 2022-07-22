import { User } from '@classes/index'

export enum ActionTypes {
  SUBMITTING = '@@auth/SUBMITTING',
  LOGIN_REQUEST = '@@auth/LOGIN_REQUEST',
  LOGIN_SUCCESS = '@@auth/LOGIN_SUCCESS',
  LOGIN_FAILURE = '@@auth/LOGIN_FAILURE',
  REGISTER_REQUEST = '@@auth/REGISTER_REQUEST',
  REGISTER_SUCCESS = '@@auth/REGISTER_SUCCESS',
  REGISTER_FAILURE = '@@auth/REGISTER_FAILURE',
  VERIFICATION_REQUEST = '@@auth/VERIFICATION_REQUEST',
  VERIFICATION_SUCCESS = '@@auth/VERIFICATION_SUCCESS',
  VERIFICATION_FAILURE = '@@auth/VERIFICATION_FAILURE',
  RESET_PASSWORD_REQUEST = '@@auth/RESET_PASSWORD_REQUEST',
  RESET_PASSWORD_SUCCESS = '@@auth/RESET_PASSWORD_SUCCESS',
  RESET_PASSWORD_FAILURE = '@@auth/RESET_PASSWORD_FAILURE',
  RESEND_CODE_REQUEST = '@@auth/RESEND_CODE_REQUEST',
  RESEND_CODE_SUCCESS = '@@auth/RESEND_CODE_SUCCESS',
  RESEND_CODE_FAILURE = '@@auth/RESEND_CODE_FAILURE',
  SET_CURRENT_USER = '@@auth/SET_CURRENT_USER',
  DESTROY_STATES = '@@auth/DESTROY_STATES',
  CLEAR_STATES = '@@auth/CLEAR_STATES'
}

export type AuthState = {
  readonly isAuthenticated: boolean
  readonly email: string | null
  readonly errors: any
  readonly isSubmitting: boolean
  readonly isResetPassword: boolean
  readonly isRegistered: boolean
  readonly isResendCode: boolean
  readonly isVerified: boolean
  readonly loading: boolean
  readonly token: string | null
  readonly user: User | null
}
