// External
import axios from './axiosConfig';

// Local
import constants from '../constants';

const categoriesAPI = {
  /**
   * @desc api request to fetch data
   * @method fetchAll
   * @return {object} return data from query
   */
  fetchAll: async () => {
    const response = await axios.get(constants.API.CATEGORIES.FETCH_ALL);
    const data = await response;
    return data;
  },

  /**
   * @desc api request to fetch data
   * @method fetchAvail
   * @return {object} return data from query
   */
  fetchAvail: async () => {
    const response = await axios.get(constants.API.CATEGORIES.FETCH_AVAIL);
    const data = await response;
    return data;
  },

  /**
   * @desc api request to create category
   * @method create
   * @param {object} catData
   * @param {string} catData.category the category to create
   * @return {object} return data from query
   */
  create: async catData => {
    const response = await axios.post(constants.API.TAGS.CREATE, catData);
    const data = await response;
    return data;
  },

  /**
   * @desc api request to delete a category
   * @method delete
   * @param {object} catData
   * @param {string} catData.id the category to delete
   * @return {object} return data from query
   */
  delete: async catData => {
    const response = await axios.delete(constants.API.CATEGORIES.DELETE, {
      data: catData,
    });
    const data = await response;
    return data;
  },

  /**
   * @desc api request to fetch data
   * @method update
   * @param {object} catData
   * @param {string} catData.category the category to update with
   * @param {string} catData.id the id of the category to update
   * @return {object} return data from query
   */
  update: async catData => {
    const response = await axios.post(constants.API.CATEGORIES.UPDATE, catData);
    const data = await response;
    return data;
  },
};

export default categoriesAPI;
