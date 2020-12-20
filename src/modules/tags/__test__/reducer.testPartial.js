// External
import { expect } from 'chai';

// Internal
import reducer from '../reducer';
import tagsActions from '../actions';
import util from '../util';

const {
  tags: {
    get: { success: getTagsSuccess },
    create: { success: createTagsSuccess },
    update: { success: updateTagsSuccess },
    delete: { success: deleteTagsSuccess },
    reset: tagsReset,
  },
} = tagsActions;
const tagsReducerTest = () =>
  describe('Reducer', () => {
    let initialStore; // instantiate beforehand
    const mockStore = util.buildMockStore;
    beforeEach(() => {
      initialStore = util.buildInitialStore(); // assign for each test block
    });

    it('Should have initial store', () => {
      expect(reducer(undefined, {})).to.deep.equal(initialStore);
    });

    it('Should get all tags', () => {
      const action = {
        type: getTagsSuccess.type,
        payload: {
          2: {
            tag: 'username',
            id: 2,
          },
        },
      };
      expect(reducer(initialStore, action)).to.deep.equal(
        mockStore({
          list: action.payload,
        })
      );
    });

    it('Should create a new tag', () => {
      const action = {
        type: createTagsSuccess.type,
        payload: {
          2: {
            tag: 'username',
            id: 2,
          },
        },
      };
      const mocked = mockStore({
        list: {
          1: {
            id: 1,
            tag: '1',
          },
        },
      });
      expect(reducer(mocked, action)).to.deep.equal(
        mockStore({
          list: {
            ...mocked.list,
            ...action.payload,
          },
        })
      );
    });

    it('Should delete a tag', () => {
      const action = {
        type: deleteTagsSuccess.type,
        payload: 2,
      };
      expect(
        reducer(
          mockStore({
            list: {
              1: {
                id: 1,
                tag: '1',
              },
              2: {
                id: 2,
                tag: 'no',
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
              tag: '1',
            },
          },
        })
      );
    });

    it('Should update a tag', () => {
      const action = {
        type: updateTagsSuccess.type,
        payload: {
          2: {
            tag: 'updated',
            id: 2,
          },
        },
      };
      const mocked = mockStore({
        list: {
          1: {
            id: 1,
            tag: '1',
          },
          2: {
            id: 2,
            tag: 'no',
          },
        },
      });
      expect(reducer(mocked, action)).to.deep.equal(
        mockStore({
          list: {
            ...mocked.list,
            ...action.payload,
          },
        })
      );
    });

    it('Should reset the store', () => {
      const action = {
        type: tagsReset.type,
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

export default tagsReducerTest;
