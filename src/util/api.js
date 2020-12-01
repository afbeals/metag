// Internal
import { user, tags } from './api/';

// Constants
const api = {
  userLogin: user.login,
  tagsFetch: tags.fetchAll,
  tagsCreate: tags.create,
  tagsDelete: tags.delete,
  tagsUpdate: tags.update,
};

export default api;
