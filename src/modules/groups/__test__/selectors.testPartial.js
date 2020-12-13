// External
import { expect } from 'chai';

// Internal
import * as selectors from '../selectors';
import util from '../util';

const groupsSelectorsTest = () =>
  describe('Selectors', () => {
    const mockStore = {}; // mock global store object
    beforeEach(() => {
      // assign for each test block
      mockStore.groups = util.buildMockStore({
        list: {
          1: {
            id: 1,
            name: 'blah',
          },
        },
      });
    });

    it('Should return equals', () => {
      expect(selectors.getGroupsStore(mockStore))
        .to.deep.equal(mockStore.groups)
        .and.an('object');
    });

    it('Should return the groups list', () => {
      expect(selectors.getGroupsList(mockStore))
        .to.deep.equal(mockStore.groups.list)
        .and.an('object');
    });

    it('Should return the groups list as an array array', () => {
      expect(selectors.getGroupsListArray(mockStore))
        .to.deep.equal([{ id: 1, name: 'blah' }])
        .and.an('array');
    });
  });

export default groupsSelectorsTest;
