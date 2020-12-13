// Internal
import groupsReducerTest from './reducer.testPartial';
import groupsSelectorsTest from './selectors.testPartial';
import groupsSagasTest from './sagas.testPartial';

describe('Groups Module Tests: ', () => {
  // run all test in block
  groupsReducerTest();
  groupsSelectorsTest();
  groupsSagasTest();
});
