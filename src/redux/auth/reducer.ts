import { Reducer } from 'redux'
import { AuthState, ActionTypes } from './types'

export const initialState: AuthState = {
  isAuthenticated: false,
  email: null,
  errors: null,
  isRegistered: false,
  isResendCode: false,
  isResetPassword: false,
  isSubmitting: false,
  isVerified: false,
  loading: false,
  token: null,
  user: null
}

const reducer: Reducer<AuthState> = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.LOGIN_REQUEST:
      return {
        ...state,
        isSubmitting: true,
        errors: initialState.errors
      }

    case ActionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        isSubmitting: initialState.isSubmitting,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true
      }

    case ActionTypes.LOGIN_FAILURE:
      return {
        ...state,
        isSubmitting: initialState.isSubmitting,
        errors: action.payload
      }

    case ActionTypes.REGISTER_REQUEST:
      return {
        ...state,
        isSubmitting: true,
        errors: initialState.errors
      }

    case ActionTypes.REGISTER_SUCCESS:
      return {
        ...state,
        isSubmitting: initialState.isSubmitting,
        user: action.payload,
        isRegistered: true
      }

    case ActionTypes.REGISTER_FAILURE:
      return {
        ...state,
        isSubmitting: initialState.isSubmitting,
        errors: action.payload,
        isRegistered: initialState.isRegistered
      }

    case ActionTypes.RESET_PASSWORD_REQUEST:
      return {
        ...state,
        isSubmitting: true,
        errors: initialState.errors
      }

    case ActionTypes.RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        isSubmitting: initialState.isSubmitting,
        isResetPassword: true
      }

    case ActionTypes.RESET_PASSWORD_FAILURE:
      return {
        ...state,
        isSubmitting: initialState.isSubmitting,
        isResetPassword: initialState.isResetPassword,
        errors: action.payload
      }

    case ActionTypes.RESEND_CODE_REQUEST:
      return {
        ...state,
        loading: true,
        errors: initialState.errors
      }

    case ActionTypes.RESEND_CODE_SUCCESS:
      return {
        ...state,
        loading: initialState.loading,
        isResendCode: true
      }

    case ActionTypes.RESEND_CODE_FAILURE:
      return {
        ...state,
        isSubmitting: initialState.isSubmitting,
        isResendCode: initialState.isResendCode,
        errors: action.payload
      }

    case ActionTypes.VERIFICATION_REQUEST:
      return {
        ...state,
        isSubmitting: true,
        errors: initialState.errors
      }

    case ActionTypes.VERIFICATION_SUCCESS:
      return {
        ...state,
        isSubmitting: initialState.isSubmitting,
        isVerified: true
      }

    case ActionTypes.VERIFICATION_FAILURE:
      return {
        ...state,
        isSubmitting: initialState.isSubmitting,
        isVerified: initialState.isVerified,
        errors: action.payload
      }

    case ActionTypes.SET_CURRENT_USER:
      return {
        ...state,
        user: action.payload
      }

    case ActionTypes.CLEAR_STATES:
      return {
        ...state,
        email: initialState.email,
        errors: initialState.errors,
        isResetPassword: initialState.isResetPassword,
        isRegistered: initialState.isRegistered,
        isResendCode: initialState.isResendCode,
        isSubmitting: initialState.isSubmitting,
        isVerified: initialState.isVerified,
        loading: initialState.loading
      }

    default:
      return state
  }
}

export { reducer as authReducer }
