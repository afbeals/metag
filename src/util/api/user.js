// External
import axios from './axiosConfig';

// Local
import constants from '../constants';

const userAPI = {
  /**
   * @desc api request to fetch data
   * @method login
   * @param {object} userData
   * @param {string} userData.username the username to login with
   * @return {object} return data from query
   */
  login: async userData => {
    const response = await axios.get(constants.API.USER.LOGIN, {
      params: userData,
    });
    const data = await response;
    return data;
  },
};

export default userAPI;
