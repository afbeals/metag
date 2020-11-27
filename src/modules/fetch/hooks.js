// External
import { useSelector } from 'react-redux';
import { checkPropTypes, bool } from 'prop-types';

// Internal
import { createFetchSelector } from './selectors';

// Constants
const fetchHooks = {
  /**
   * @method useRequestCheck
   * @desc check on status of request
   * @param {Object} requestSelectors list of requests to check on
   * @example
   * const { isFetchingUserData } = useRequestCheck({
   *  isFetchingUserData: 'userIsFetchingData'
   * })
   */
  useRequestCheck: reqs => {
    const props = {};
    const propTypes = {};
    const fetchSelector = createFetchSelector();
    Object.entries(reqs).forEach(([key, val]) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      props[key] = useSelector(store => fetchSelector(store, val));
      propTypes[key] = bool;
    });

    checkPropTypes(propTypes, props, 'prop', `Hook: useRequestCheck`);

    return props;
  },
};

export default fetchHooks;
