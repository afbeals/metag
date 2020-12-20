// External
import { expect } from 'chai';

// Internal
import actions from '../actions';
import reducer from '../reducer';
import util from '../util';

const {
  groups: {
    getall: { success: getGroupsSuccess },
    create: { success: createGroupsSuccess },
    add: { success: addGroupsSuccess },
    update: { success: updateGroupsSuccess },
    delete: { success: deleteGroupsSuccess },
    reset,
  },
} = actions;
const groupsReducerTest = () =>
  describe('Reducer', () => {
    let initialStore; // instantiate beforehand
    const mockStore = util.buildMockStore;
    beforeEach(() => {
      initialStore = util.buildInitialStore(); // assign for each test block
    });

    it('Should have initial store', () => {
      expect(reducer(undefined, {})).to.deep.equal(initialStore);
    });

    it('Should get all categories', () => {
      const action = {
        type: getGroupsSuccess.type,
        payload: {
          2: {
            name: 'username',
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

    it('Should add a new name', () => {
      const action = {
        type: addGroupsSuccess.type,
        payload: {
          2: {
            name: 'username',
            id: 2,
          },
        },
      };
      const mocked = mockStore({
        list: {
          1: {
            id: 1,
            name: '1',
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

    it('Should create a new name', () => {
      const action = {
        type: createGroupsSuccess.type,
        payload: {
          2: {
            name: 'username',
            id: 2,
          },
        },
      };
      const mocked = mockStore({
        list: {
          1: {
            id: 1,
            name: '1',
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

    it('Should delete a name', () => {
      const action = {
        type: deleteGroupsSuccess.type,
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

    it('Should update a name', () => {
      const action = {
        type: updateGroupsSuccess.type,
        payload: {
          2: {
            name: 'updated',
            id: 2,
          },
        },
      };
      const mocked = mockStore({
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
        type: reset.type,
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

export default groupsReducerTest;
