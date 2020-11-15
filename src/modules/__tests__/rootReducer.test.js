// External

// Local
import rootReducer from '../rootReducer';

describe('Root Reducer Test', () => {
  describe('modules/rootReducer', () => {
    it('Should exist', () => {
      expect.exists(rootReducer, 'rootReducer not found');
    });

    it('Should export an object', () => {
      expect.equal(typeof rootReducer, 'object', 'rootReducer not a object');
    });
  });
});
