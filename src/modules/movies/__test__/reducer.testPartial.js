// External
import { expect } from 'chai';

// Internal
import reducer from '../reducer';
import actions from '../actions';
import util from '../util';

const {
  movies: {
    all: { success: allSuccess },
    under_cat: { success: under_catSuccess },
    under_tag: { success: under_tagSuccess },
    search: { request: searchReq, success: searchSuccess, clear: searchClear },
    add: { success: addSuccess },
    delete: { success: deleteSuccess },
    update: { success: updateSuccess },
    reset: resetMovie,
  },
} = actions;
const moviesReducerTest = () =>
  describe('Reducer', () => {
    let initialStore; // instantiate beforehand
    const mockStore = util.buildMockStore;
    beforeEach(() => {
      initialStore = util.buildInitialStore(); // assign for each test block
    });

    it('Should have initial store', () => {
      expect(reducer(undefined, {})).to.deep.equal(initialStore);
    });

    [
      under_catSuccess.type,
      under_tagSuccess.type,
      searchSuccess.type,
      allSuccess.type,
    ].forEach(type =>
      it(`Should add the movie when ${type}`, () => {
        const action = {
          type,
          payload: [
            {
              name: 'movie name',
              tag: [1, 2],
              id: 2,
            },
          ],
        };
        expect(reducer(initialStore, action)).to.deep.equal(
          mockStore({
            list: {
              [action.payload[0]['id']]: action.payload[0],
            },
          })
        );
      })
    );

    [addSuccess.type, updateSuccess.type].forEach(type =>
      it(`Should set the movie updated/added when ${type}`, () => {
        const action = {
          type: type,
          payload: [
            {
              name: 'new',
              id: 2,
            },
          ],
        };
        const mocked = mockStore({
          list: {
            1: {
              id: 1,
              name: '1',
            },
            2: {
              name: 'original',
              id: 2,
            },
          },
        });
        expect(reducer(mocked, action)).to.deep.equal(
          mockStore({
            list: {
              ...mocked.list,
              ...{ 2: { ...action.payload[0] } },
            },
          })
        );
      })
    );

    it('Should delete a movie', () => {
      const action = {
        type: deleteSuccess.type,
        payload: 2,
      };
      expect(
        reducer(
          mockStore({
            list: {
              1: {
                id: 1,
                name: '1',
              },
              2: {
                id: 2,
                name: 'no',
              },
            },
          }),
          action
        )
      ).to.deep.equal(
        mockStore({
          list: {
            1: {
              id: 1,
              name: '1',
            },
          },
        })
      );
    });

    it('Should clear the search store', () => {
      const action = {
        type: searchClear.type,
      };
      const mocked = mockStore({
        list: {
          1: {
            id: 1,
            tag: '1',
          },
        },
        search: {
          prevId: 123,
          name: 'name',
          tags: [1, 2, 3],
          categories: [52, 3],
        },
      });
      expect(reducer(mocked, action)).to.deep.equal(
        mockStore({
          list: {
            ...mocked.list,
          },
          search: null,
        })
      );
    });

    it('Should search for a movie', () => {
      const action = {
        type: searchReq.type,
        payload: {
          prevId: 123,
          name: 'name',
          tags: [1, 2, 3],
          categories: [52, 3],
          dontAdd: 'adfaf',
        },
      };
      const mocked = mockStore({
        list: {
          1: {
            id: 1,
            tag: '1',
          },
        },
        search: null,
      });
      const { dontAdd, ...expected } = action.payload;
      expect(reducer(mocked, action)).to.deep.equal(
        mockStore({
          list: {
            ...mocked.list,
          },
          search: {
            ...expected,
          },
        })
      );
    });

    it('Should reset the store', () => {
      const action = {
        type: resetMovie.type,
      };
      expect(
        reducer(
          mockStore({
            list: { 1: { id: 1 } },
          }),
          action
        )
      ).to.deep.equal(initialStore);
    });
  });

export default moviesReducerTest;
