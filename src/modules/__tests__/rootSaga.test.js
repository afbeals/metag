// External

// Local
import rootSaga from '~Modules/rootSaga';

describe('Root Saga Test', () => {
  describe('modules/rootSaga', () => {
    it('Should exist', () => {
      expect.exists(rootSaga, 'rootSaga not found');
    });

    it('Should export a function', () => {
      expect.equal(typeof rootSaga, 'function', 'rootSaga not a function');
    });
  });
});
