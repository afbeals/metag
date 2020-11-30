// Internal
import userReducerTest from './reducer.testPartial';
import userSelectorsTest from './selectors.testPartial';
import userSagasTest from './sagas.testPartial';

describe('User Module Tests: ', () => {
  // run all test in block
  userReducerTest();
  userSelectorsTest();
  userSagasTest();
});
