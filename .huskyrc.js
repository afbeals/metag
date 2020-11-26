const huskyOptions = {
  "hooks": {
     "pre-commit": "npm run test && npm run lint:fe && git add -A"
   }
};

module.exports = huskyOptions;
