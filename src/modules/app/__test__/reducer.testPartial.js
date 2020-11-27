// External
import { expect } from 'chai';

// Local
import reducer from '../reducer';
import types from '../types';
import appUtil from '../util';

// Constants
const {
  OVERLAY_HIDE,
  OVERLAY_SHOW,
  NOTIFY_SHOW,
  NOTIFY_HIDE,
  MODAL_SHOW,
  MODAL_HIDE,
} = types;

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
      expect(reducer(initialStore, { type: OVERLAY_SHOW })).to.deep.equal(
        mockStore({
          showOverlay: 1,
        })
      );
    });

    it('Should handle hiding the overlay', () => {
      expect(
        reducer(mockStore({ showOverlay: 1 }), { type: OVERLAY_HIDE })
      ).to.deep.equal(initialStore);
    });

    it('Should handle showing the notification', () => {
      const payload = {
        type: 'success',
        duration: 2342,
        msg: 'hello',
      };
      expect(
        reducer(initialStore, { type: NOTIFY_SHOW, payload })
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
          { type: NOTIFY_HIDE }
        )
      ).to.deep.equal(initialStore);
    });

    it('Should handle showing the modal', () => {
      expect(reducer(initialStore, { type: MODAL_SHOW })).to.deep.equal(
        mockStore({
          showModal: true,
        })
      );
    });

    it('Should handle hiding the modal', () => {
      expect(
        reducer(mockStore({ showModal: false }), { type: MODAL_HIDE })
      ).to.deep.equal(initialStore);
    });
  });

export default appReducerTest;
