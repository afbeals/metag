// External

// Local
import rootMiddleware from '../rootMiddleware';

describe('Root Middleware Test', () => {
  describe('modules/rootMiddleware', () => {
    it('Should exist', () => {
      expect(rootMiddleware).toBeTruthy();
    });

    it('Should export an array', () => {
      expect(Array.isArray(rootMiddleware)).toBeTruthy();
    });
  });
});
