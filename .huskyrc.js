const huskyOptions = {
  "hooks": {
     "pre-push": "npm run test && npm run lint:fe",
     "push-msg": "commitlint -E HUSKY_GIT_PARAMS"
   }
};

module.exports = huskyOptions;
