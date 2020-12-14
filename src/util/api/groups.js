// External
import axios from './axiosConfig';

// Local
import constants from '../constants';

const groupsAPI = {
  /**
   * @desc api request to add established group to db
   * @method addGroup
   * @param {Object} input
   * @param {String} input.name then name for the folder
   * @param {String} input.src_folder then source for the folder
   * @return {object} return data from query
   */
  addGroup: async input => {
    const response = await axios.post(constants.API.GROUPS.ADD, input);
    const data = await response;
    return data;
  },

  /**
   * @desc api request to fetch data
   * @method getAll
   * @return {object} return data from query
   */
  getAll: async () => {
    const response = await axios.get(constants.API.GROUPS.GET.ALL_GROUPS);
    const data = await response;
    return data;
  },

  /**
   * @desc api request to fetch data
   * @method getAvail
   * @return {object} return data from query
   */
  getAvail: async () => {
    const response = await axios.get(constants.API.GROUPS.GET.AVAIL_GROUPS);
    const data = await response;
    return data;
  },

  /**
   * @desc api request to create group
   * @method create
   * @param {object} input
   * @param {string} input.group the group name to create
   * @return {object} return data from query
   */
  create: async input => {
    const response = await axios.post(constants.API.GROUPS.CREATE, input);
    const data = await response;
    return data;
  },

  /**
   * @desc api request to delete a group
   * @method delete
   * @param {object} input
   * @param {string} input.id the group to delete
   * @return {object} return data from query
   */
  delete: async input => {
    const response = await axios.delete(constants.API.GROUPS.DELETE, {
      data: input,
    });
    const data = await response;
    return data;
  },

  /**
   * @desc api request to fetch data
   * @method update
   * @param {object} input
   * @param {string} input.group the group to update with
   * @param {string} input.id the id of the group to update
   * @return {object} return data from query
   */
  update: async input => {
    const response = await axios.post(constants.API.GROUPS.UPDATE, input);
    const data = await response;
    return data;
  },
};

export default groupsAPI;
