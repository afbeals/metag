// Internal
import tagsReducerTest from './reducer.testPartial';
import tagsSelectorsTest from './selectors.testPartial';
import tagsSagasTest from './sagas.testPartial';

describe('Tags Module Tests: ', () => {
  // run all test in block
  tagsReducerTest();
  tagsSelectorsTest();
  tagsSagasTest();
});
