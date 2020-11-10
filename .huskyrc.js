const huskyOptions = {
  "hooks": {
     "pre-push": "npm test && npm lint:fe",
     "push-msg": "commitlint -E HUSKY_GIT_PARAMS"
   }
};

module.exports = huskyOptions;
