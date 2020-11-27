// External
import { expect } from 'chai';

// Internal
import actions from '../actions';
import types from '../types';

// Constants
const {
  MODAL_HIDE,
  MODAL_SHOW,
  NOTIFY_SHOW,
  NOTIFY_HIDE,
  OVERLAY_SHOW,
  OVERLAY_HIDE,
} = types;

const appActionsTest = () =>
  describe('Actions:', () => {
    describe('Overlay actions:', () => {
      it('Should set the overlay to display', () => {
        expect(actions.appShowOverlay()).deep.equal({
          type: OVERLAY_SHOW,
        });
      });
      it('Should set the overlay to hide', () => {
        expect(actions.appHideOverlay()).deep.equal({
          type: OVERLAY_HIDE,
        });
      });
    });

    describe('Notification Actions:', () => {
      it('Should set the notification to display', () => {
        const params = {
          type: 'SUCCESS',
          timer: 3000,
          msg: 'great',
        };
        expect(actions.appShowNotify(params)).to.deep.equal({
          type: NOTIFY_SHOW,
          payload: params,
        });
      });
      it('Should set the notification to hide', () => {
        expect(actions.appHideNotify()).to.deep.equal({
          type: NOTIFY_HIDE,
        });
      });
    });

    describe('Modal Actions:', () => {
      it('Should set the modal to display', () => {
        expect(actions.appShowModal()).to.deep.equal({
          type: MODAL_SHOW,
        });
      });
      it('Should set the modal to hide', () => {
        expect(actions.appHideModal()).to.deep.equal({
          type: MODAL_HIDE,
        });
      });
    });
  });

export default appActionsTest;
