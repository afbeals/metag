/**
 * @method actionCreator
 * @param {string} type the string type of the action
 * @param {(any|null)} [payload] payload for reducer to work with
 * @param {(meta|null)} [meta] extra data not for reducer
 * @return {object} the action creator
 */
export const actionCreator = (type, payload, meta) => ({
  type,
  ...(payload && { payload }),
  ...(meta && { meta }),
});

export default {
  actionCreator,
};
