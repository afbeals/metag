// External
import { expect } from 'chai';

// Internal
import * as selectors from '../selectors';

const fetchSelectorsTest = () =>
  describe('Selectors', () => {
    const initialStore = {
      fetch: {},
    }; // mock global store object
    const mockStore = {
      fetch: {
        userIsFetchingData: 1,
        userHasFetchedData: false,
      },
    };

    it('Should return equals', () => {
      expect(selectors.getFetchStore(mockStore))
        .to.deep.equal(mockStore.fetch)
        .and.an('object');
    });

    it('Should return fetch results for user as bool', () => {
      const fetchSelector = selectors.createFetchSelector();
      expect(fetchSelector(mockStore, 'userIsFetchingData'))
        .to.deep.equal(true)
        .and.a('boolean');
    });

    it('Should return fetched results for pokedex as bool', () => {
      const fetchSelector = selectors.createFetchSelector();
      expect(fetchSelector(mockStore, 'userHasFetchedData'))
        .to.deep.equal(mockStore.fetch.userHasFetchedData)
        .and.a('boolean');
    });

    it('Should return false when key unavaliable', () => {
      const fetchSelector = selectors.createFetchSelector();
      expect(fetchSelector(initialStore, 'nonExistantResults'))
        .to.deep.equal(false)
        .and.a('boolean');
    });
  });

export default fetchSelectorsTest;
