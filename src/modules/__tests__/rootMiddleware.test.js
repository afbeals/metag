// External

// Local
import rootMiddleware from '../rootMiddleware';

describe('Root Middleware Test', () => {
  describe('modules/rootMiddleware', () => {
    it('Should exist', () => {
      expect.exists(rootMiddleware, 'rootMiddleware not found');
    });

    it('Should export an array', () => {
      expect.equal(
        Array.isArray(rootMiddleware),
        true,
        'rootMiddlware not a array'
      );
    });
  });
});
