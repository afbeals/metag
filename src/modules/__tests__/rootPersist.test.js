// External

// Local
import rootPersist from '../rootPersist';

describe('Root Persist Test', () => {
  describe('modules/rootPersist', () => {
    it('Should exist', () => {
      expect.exists(rootPersist, 'rootPersist not found');
    });

    it('Should export an object', () => {
      expect.equal(typeof rootPersist, 'object', 'rootPersist not a object');
    });
  });
});
