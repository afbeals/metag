// External

// Local
import rootPersist from '../rootPersist';

describe('Root Persist Test', () => {
  describe('modules/rootPersist', () => {
    it('Should exist', () => {
      expect(rootPersist).toBeTruthy();
    });

    it('Should export an object', () => {
      expect(typeof rootPersist).toBe('object');
      expect(Object.keys(rootPersist).length).toBeGreaterThanOrEqual(0);
    });
  });
});
