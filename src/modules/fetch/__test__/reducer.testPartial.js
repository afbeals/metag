// External
import { expect } from 'chai';

// Internal
import reducer from '../reducer';

const fetchReducerTest = () =>
  describe('Reducer', () => {
    const preType = 'MOCK/USER/'; // instantiate beforehand
    const initialState = {}; // instantiate beforehand
    it('Should have initial store', () => {
      expect(reducer(undefined, {})).to.deep.equal(initialState);
    });

    it('Should set fetching to 1 and fetched to false', () => {
      const type = `${preType}DATA/REQUEST`;
      expect(reducer(initialState, { type })).to.deep.equal({
        userIsFetchingData: 1,
        userHasFetchedData: false,
      });
    });

    it('Should set fetching to 0 and fetched status to true', () => {
      const type = `${preType}DATA/SUCCESS`;
      const mockState = {
        userIsFetchingData: 1,
        userHasFetchedData: false,
      };
      expect(reducer(mockState, { type })).to.deep.equal({
        userIsFetchingData: 0,
        userHasFetchedData: true,
      });
    });

    it('Should set fetching to 2 and fetched status to false', () => {
      const type = `${preType}DATA/FAIL`;
      const mockStore = {
        userIsFetchingData: 3,
        userHasFetchedData: false,
      };
      expect(reducer(mockStore, { type })).to.deep.equal({
        userIsFetchingData: 2,
        userHasFetchedData: false,
      });
    });

    it('Should set fetching to 2 and fetched status to false', () => {
      const type = `${preType}DATA/CANCEL`;
      const mockStore = {
        userIsFetchingData: 3,
        userHasFetchedData: false,
      };
      expect(reducer(mockStore, { type })).to.deep.equal({
        userIsFetchingData: 2,
        userHasFetchedData: false,
      });
    });
  });

export default fetchReducerTest;
