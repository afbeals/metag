// External
import { expect } from 'chai';

// Internal
import * as selectors from '../selectors';
import util from '../util';

const appSelectorsTest = () =>
  describe('Selectors', () => {
    const mockStore = {}; // mock global store object
    beforeEach(() => {
      // assign for each test block
      mockStore.app = util.buildMockStore({
        showOverlay: 1,
        showModal: true,
        notification: {
          msg: 'asdfa',
        },
      });
    });

    it('Should return equals', () => {
      expect(selectors.getAppStore(mockStore))
        .to.deep.equal(mockStore.app)
        .and.an('object');
    });

    it('Should return the overlay status as a boolean', () => {
      expect(selectors.appOverlayIsVisible(mockStore))
        .to.equal(true)
        .and.a('boolean');
    });

    it('Should return the notification information', () => {
      expect(selectors.appNotification(mockStore))
        .to.deep.equal(mockStore.app.notification)
        .and.an('object');
    });

    it('Should return the modal status as a buoolean', () => {
      expect(selectors.appModalIsVisible(mockStore))
        .to.equal(mockStore.app.showModal)
        .and.a('boolean');
    });
  });

export default appSelectorsTest;
