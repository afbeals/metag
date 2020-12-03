// External
import { expect } from 'chai';

// Local
import reducer from '../reducer';
import actions from '../actions';
import appUtil from '../util';

// Constants
const {
  app: {
    modal: { show: appShowModal, hide: appHideModal },
    notify: { show: appShowNotify, hide: appHideNotify },
    overlay: { show: appShowOverlay, hide: appHideOverlay },
  },
} = actions;

// Reducer
const appReducerTest = () =>
  describe('Reducer', () => {
    let initialStore; // instantiate beforehand
    const mockStore = appUtil.buildMockStore;
    beforeEach(() => {
      initialStore = appUtil.buildInitialStore(); // assign for each test block
    });

    it('Should have initial store', () => {
      expect(reducer(undefined, {})).to.deep.equal(initialStore);
    });

    it('Should handle showing the overlay', () => {
      expect(
        reducer(initialStore, { type: appShowOverlay.type })
      ).to.deep.equal(
        mockStore({
          showOverlay: 1,
        })
      );
    });

    it('Should handle hiding the overlay', () => {
      expect(
        reducer(mockStore({ showOverlay: 1 }), { type: appHideOverlay.type })
      ).to.deep.equal(initialStore);
    });

    it('Should handle showing the notification', () => {
      const payload = {
        type: 'success',
        duration: 2342,
        msg: 'hello',
      };
      expect(
        reducer(initialStore, { type: appShowNotify.type, payload })
      ).to.deep.equal(
        mockStore({
          notification: {
            ...payload,
          },
        })
      );
    });

    it('Should handle hiding the notification', () => {
      expect(
        reducer(
          mockStore({
            notification: {},
          }),
          { type: appHideNotify.type }
        )
      ).to.deep.equal(initialStore);
    });

    it('Should handle showing the modal', () => {
      expect(reducer(initialStore, { type: appShowModal.type })).to.deep.equal(
        mockStore({
          showModal: true,
        })
      );
    });

    it('Should handle hiding the modal', () => {
      expect(
        reducer(mockStore({ showModal: false }), { type: appHideModal.type })
      ).to.deep.equal(initialStore);
    });
  });

export default appReducerTest;
