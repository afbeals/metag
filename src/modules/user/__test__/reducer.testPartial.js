// External
import { expect } from 'chai';

// Internal
import reducer from '../reducer';
import actions from '../actions';
import util from '../util';

const {
  user: {
    login: { success: userLoginSuccess },
    reset: userReset,
  },
} = actions;

const userReducerTest = () =>
  describe('Reducer', () => {
    let initialStore; // instantiate beforehand
    const mockStore = util.buildMockStore;
    beforeEach(() => {
      initialStore = util.buildInitialStore(); // assign for each test block
    });

    it('Should have initial store', () => {
      expect(reducer(undefined, {})).to.deep.equal(initialStore);
    });

    it('Should log in the user', () => {
      const action = {
        type: userLoginSuccess.type,
        payload: {
          username: 'username',
          id: 2,
        },
      };
      expect(reducer(initialStore, action)).to.deep.equal(
        mockStore({
          info: action.payload,
        })
      );
    });

    it('Should reset the store', () => {
      const action = {
        type: userReset.type,
      };
      expect(
        reducer(
          mockStore({
            info: action.payload,
          }),
          action
        )
      ).to.deep.equal(initialStore);
    });
  });

export default userReducerTest;
