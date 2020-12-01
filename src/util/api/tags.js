// External
import axios from './axiosConfig';

// Local
import constants from '../constants';

const tagsAPI = {
  /**
   * @desc api request to fetch data
   * @method fetchAll
   * @return {object} return data from query
   */
  fetchAll: async () => {
    const response = await axios.get(constants.API.TAGS.FETCH_ALL);
    const data = await response;
    return data;
  },

  /**
   * @desc api request to create tag
   * @method create
   * @param {object} tagData
   * @param {string} tagData.tag the tag to create
   * @return {object} return data from query
   */
  create: async tagData => {
    const response = await axios.post(constants.API.TAGS.CREATE, tagData);
    const data = await response;
    return data;
  },

  /**
   * @desc api request to delete tag
   * @method delete
   * @param {object} tagData
   * @param {string} tagData.tag the tag to create
   * @return {object} return data from query
   */
  delete: async tagData => {
    const response = await axios.delete(constants.API.TAGS.DELETE, {
      data: tagData,
    });
    const data = await response;
    return data;
  },

  /**
   * @desc api request to fetch data
   * @method update
   * @param {object} tagData
   * @param {string} tagData.tag the tag to update with
   * @param {string} tagData.id the id of the tag to update
   * @return {object} return data from query
   */
  update: async tagData => {
    const response = await axios.post(constants.API.TAGS.UPDATE, tagData);
    const data = await response;
    return data;
  },
};

export default tagsAPI;
