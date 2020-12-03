// Internal
import categoriesReducerTest from './reducer.testPartial';
import categoriesSelectorsTest from './selectors.testPartial';
import categoriesSagasTest from './sagas.testPartial';

describe('Categories Module Tests: ', () => {
  // run all test in block
  categoriesReducerTest();
  categoriesSelectorsTest();
  categoriesSagasTest();
});
