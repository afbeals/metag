// External
import { expect } from 'chai';

// Internal
import actions from '../actions';

// Constants
const {
  app: {
    modal: { show: appShowModal, hide: appHideModal },
    notify: { show: appShowNotify, hide: appHideNotify },
    overlay: { show: appShowOverlay, hide: appHideOverlay },
  },
} = actions;

const appActionsTest = () =>
  describe('Actions:', () => {
    describe('Overlay actions:', () => {
      it('Should set the overlay to display', () => {
        expect(appShowOverlay()).deep.equal({
          payload: undefined,
          type: appShowOverlay.type,
        });
      });
      it('Should set the overlay to hide', () => {
        expect(appHideOverlay()).deep.equal({
          payload: undefined,
          type: appHideOverlay.type,
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
        expect(appShowNotify(params)).to.deep.equal({
          type: appShowNotify.type,
          payload: params,
        });
      });
      it('Should set the notification to hide', () => {
        expect(appHideNotify()).to.deep.equal({
          payload: undefined,
          type: appHideNotify.type,
        });
      });
    });

    describe('Modal Actions:', () => {
      it('Should set the modal to display', () => {
        expect(appShowModal()).to.deep.equal({
          payload: undefined,
          type: appShowModal.type,
        });
      });
      it('Should set the modal to hide', () => {
        expect(appHideModal()).to.deep.equal({
          payload: undefined,
          type: appHideModal.type,
        });
      });
    });
  });

export default appActionsTest;
