// External
import { all } from 'redux-saga/effects';

// Local
import userWatchers from './user/sagas';

export default function* rootSaga() {
  // load watchers
  yield all([userWatchers()]);
}
