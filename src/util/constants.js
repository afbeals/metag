// Internal

const constants = {
  API: {
    USER: {
      LOGIN: `/getUser`,
      UPDATE: `/updateUser`,
      CREATE: `/createUser`,
    },
    TAGS: {
      CREATE: `/createTag`,
      DELETE: `/deleteTag`,
      FETCH_ALL: `/getAllTags`,
      UPDATE: `/updateTag`,
    },
    CATEGORIES: {
      CREATE: `/createCategory`,
      DELETE: `/deleteCategory`,
      FETCH_ALL: `/getAllCategories`,
      FETCH_AVAIL: `/getAvailableCategories`,
      UPDATE: `/updateCategory`,
    },
  },
};

export default constants;
