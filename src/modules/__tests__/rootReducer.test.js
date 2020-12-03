// External

// Local
import rootReducer from '../rootReducer';

describe('Root Reducer Test', () => {
  describe('modules/rootReducer', () => {
    it('Should exist', () => {
      expect(rootReducer).toBeTruthy();
    });

    it('Should export an object', () => {
      expect(typeof rootReducer).toBe('function');
      expect(Object.keys(rootReducer).length).toBeGreaterThanOrEqual(0);
    });
  });
});
