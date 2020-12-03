// Internal
import moviesReducerTest from './reducer.testPartial';
import moviesSelectorsTest from './selectors.testPartial';
import moviesSagasTest from './sagas.testPartial';

describe('Movies Module Tests: ', () => {
  // run all test in block
  moviesReducerTest();
  moviesSelectorsTest();
  moviesSagasTest();
});
