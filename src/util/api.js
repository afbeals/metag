// Internal
import { user, tags, categories } from './api/';

// Constants
const api = {
  userLogin: user.login,
  tagsFetch: tags.fetchAll,
  tagsCreate: tags.create,
  tagsDelete: tags.delete,
  tagsUpdate: tags.update,
  catFetchAll: categories.fetchAll,
  catFetchAvail: categories.fetchAvail,
  catCreate: categories.create,
  catDelete: categories.delete,
  catUpdate: categories.update,
};

export default api;
