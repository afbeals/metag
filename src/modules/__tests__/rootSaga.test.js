// External

// Local
import rootSaga from '~Modules/rootSaga';

describe('Root Saga Test', () => {
  describe('modules/rootSaga', () => {
    it('Should exist', () => {
      expect(rootSaga).toBeTruthy();
    });

    it('Should export a function', () => {
      expect(typeof rootSaga).toBe('function');
    });
  });
});
