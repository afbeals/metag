// External
import { expect } from 'chai';

// Internal
import * as selectors from '../selectors';
import util from '../util';

const userSelectorsTest = () =>
  describe('Selectors', () => {
    const mockStore = {}; // mock global store object
    beforeEach(() => {
      // assign for each test block
      mockStore.user = util.buildMockStore({
        info: {
          username: 'username',
          firstName: 'first',
          lastName: 'last',
          id: 1,
        },
      });
    });

    it('Should return equals', () => {
      expect(selectors.getUserStore(mockStore))
        .to.deep.equal(mockStore.user)
        .and.an('object');
    });

    it('Should return user info', () => {
      expect(selectors.getUserInfo(mockStore))
        .to.deep.equal(mockStore.user.info)
        .and.an('object');
    });
  });

export default userSelectorsTest;
