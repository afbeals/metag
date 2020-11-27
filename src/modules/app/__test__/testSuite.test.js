// Local
import appActionsTest from './actions.testPartial';
import appReducerTest from './reducer.testPartial';
import appSelectorsTest from './selectors.testPartial';

describe('App Module Tests: ', () => {
  // run all test in block
  appActionsTest();
  appReducerTest();
  appSelectorsTest();
});
