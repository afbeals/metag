// Internal
import { getRequestMatch, getCapitalized } from '~GlobalUtil/normalize';

// Constants

export default function reducer(state = {}, { type }) {
  const matches = getRequestMatch(type); // query type to check if request
  if (!matches) return state; // return if not fetch type

  const [, requestFullString, requestStatus] = matches; // destruct for values
  const reqPartial = requestFullString.split('/'); // module and data request type
  reqPartial.shift(); // remove first item
  // prepare for camelCase
  const module = reqPartial[0].toLowerCase();
  const reqType = getCapitalized(reqPartial[1].toLowerCase());
  const adjustedTypeFetching = `${module}IsFetching${reqType}`; // create fetching key
  const adjustedTypeFetched = `${module}HasFetched${reqType}`; // create fetched key

  const currentFetchingValue = state[adjustedTypeFetching] || 0; // handle initial req's
  return {
    ...state,
    [adjustedTypeFetching]:
      requestStatus === 'REQUEST'
        ? Math.max(0, currentFetchingValue + 1)
        : Math.max(0, currentFetchingValue - 1), // check if currently fetching
    [adjustedTypeFetched]:
      requestStatus === 'SUCCESS' && state[adjustedTypeFetching] === 1, // check if fetched
  };
}
