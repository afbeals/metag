// Local
import fetchReducerTest from './reducer.testPartial';
import fetchSelectorsTest from './selectors.testPartial';

describe('Fetch Module Tests: ', () => {
  // run all test in block
  fetchReducerTest();
  fetchSelectorsTest();
});
