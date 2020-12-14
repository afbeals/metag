// External
import { all } from 'redux-saga/effects';

// Local
import catWatchers from './categories/sagas';
import groupWatchers from './groups/sagas';
import moviesWatchers from './movies/sagas';
import tagsWatchers from './tags/sagas';
import userWatchers from './user/sagas';

export default function* rootSaga() {
  // load watchers
  yield all([
    groupWatchers(),
    catWatchers(),
    moviesWatchers(),
    tagsWatchers(),
    userWatchers(),
  ]);
}
