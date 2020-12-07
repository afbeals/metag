// External
import fetch from 'axios';

// Local
import constants from '../constants';

// Constants

const axios = fetch.create({
  baseURL: constants.API.ROOT,
});

export default axios;
