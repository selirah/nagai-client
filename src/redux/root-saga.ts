import { all, fork } from 'redux-saga/effects';
import authSaga from './auth/saga';

export function* rootSaga(): Generator {
  yield all([fork(authSaga)]);
}
