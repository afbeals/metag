// External
import { expect } from 'chai';

// Internal
import * as selectors from '../selectors';
import util from '../util';

const categoriesSelectorsTest = () =>
  describe('Selectors', () => {
    const mockStore = {}; // mock global store object
    beforeEach(() => {
      // assign for each test block
      mockStore.categories = util.buildMockStore({
        list: {
          1: {
            id: 1,
            name: 'blah',
          },
        },
      });
    });

    it('Should return equals', () => {
      expect(selectors.getCategoriesStore(mockStore))
        .to.deep.equal(mockStore.categories)
        .and.an('object');
    });

    it('Should return the categories list', () => {
      expect(selectors.getCategoriesList(mockStore))
        .to.deep.equal(mockStore.categories.list)
        .and.an('object');
    });

    it('Should return the categories list as an array array', () => {
      expect(selectors.getCategoriesListArray(mockStore))
        .to.deep.equal([{ id: 1, name: 'blah' }])
        .and.an('array');
    });
  });

export default categoriesSelectorsTest;
