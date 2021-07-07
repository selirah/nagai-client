import { action } from 'typesafe-actions'
import { User, LoginFields, RegisterFields, Auth } from 'classes'
import { ActionTypes } from './types'

const authActions = {
  loginRequest: (payload: LoginFields) =>
    action(ActionTypes.LOGIN_REQUEST, payload),

  loginSuccess: (data: Auth) => action(ActionTypes.LOGIN_SUCCESS, data),

  loginFailure: (errors: any) => action(ActionTypes.LOGIN_FAILURE, errors),

  registerRequest: (payload: RegisterFields) =>
    action(ActionTypes.REGISTER_REQUEST, payload),

  registerSuccess: (user: User) => action(ActionTypes.REGISTER_SUCCESS, user),

  registerFailure: (errors: any) =>
    action(ActionTypes.REGISTER_FAILURE, errors),

  resetPasswordRequest: (payload: any) =>
    action(ActionTypes.RESET_PASSWORD_REQUEST, payload),

  resetPasswordSuccess: () => action(ActionTypes.RESET_PASSWORD_SUCCESS),

  resetPasswordFailure: (errors: any) =>
    action(ActionTypes.RESET_PASSWORD_FAILURE, errors),

  verificationRequest: (payload: any) =>
    action(ActionTypes.VERIFICATION_REQUEST, payload),

  verificationSuccess: () => action(ActionTypes.VERIFICATION_SUCCESS),

  verificationFailure: (errors: any) =>
    action(ActionTypes.VERIFICATION_FAILURE, errors),

  resendCodeRequest: (payload: any) =>
    action(ActionTypes.RESEND_CODE_REQUEST, payload),

  resendCodeSuccess: () => action(ActionTypes.RESEND_CODE_SUCCESS),

  resendCodeFailure: (errors: any) =>
    action(ActionTypes.RESEND_CODE_FAILURE, errors),

  setCurrentUser: (user: User) => action(ActionTypes.SET_CURRENT_USER, user),

  clearStates: () => action(ActionTypes.CLEAR_STATES),

  logout: () => action(ActionTypes.DESTROY_STATES)
}

export default authActions
