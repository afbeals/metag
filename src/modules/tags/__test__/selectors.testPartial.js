// External
import { expect } from 'chai';

// Internal
import * as selectors from '../selectors';
import util from '../util';

const tagsSelectorsTest = () =>
  describe('Selectors', () => {
    const mockStore = {}; // mock global store object
    beforeEach(() => {
      // assign for each test block
      mockStore.tags = util.buildMockStore({
        list: {
          1: {
            id: 1,
            tag: 'blah',
          },
        },
      });
    });

    it('Should return equals', () => {
      expect(selectors.getTagsStore(mockStore))
        .to.deep.equal(mockStore.tags)
        .and.an('object');
    });

    it('Should return the tags list', () => {
      expect(selectors.getTagsList(mockStore))
        .to.deep.equal(mockStore.tags.list)
        .and.an('object');
    });

    it('Should return the tags list as an array array', () => {
      expect(selectors.getTagsListArray(mockStore))
        .to.deep.equal([{ id: 1, tag: 'blah' }])
        .and.an('array');
    });
  });

export default tagsSelectorsTest;
