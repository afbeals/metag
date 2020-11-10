// External
const path = require('path');
const { addBundleVisualizer, adjustStyleLoaders } = require('customize-cra');

// Internal
const styleVars = require('../src/styles/abstract/_variables.js');
const { jsToSassVariables } = require('./util.js');

/**
 * @name customizers
 * @desc custom options/functions for webpack
 */
const customizers = {
  /**
   * @name aliasRoutes
   * @return {Object}
   */
  aliasRoutes: {
    '~Components': path.resolve(__dirname, '../src/components'),
    '~Modules': path.resolve(__dirname, '../src/modules'),
    '~Pages': path.resolve(__dirname, '../src/pages'),
    '~Styles': path.resolve(__dirname, '../src/styles'),
    '~Util': path.resolve(__dirname, '../src/util'),
    '~Images': path.resolve(__dirname, '../public/images'),
  },
  /**
   * @method bundleVisualizer
   * @desc see size of bundle components, set REACT_APP_RUN_BUNDLE_VIS
   */
  bundleVisualizer: () => (config, env) => {
    const { RUN_BUNDLE_VIS = false } = process.env;
    if (RUN_BUNDLE_VIS) {
      return addBundleVisualizer()(config, env);
    }
    return config;
  },

  /**
   * @method styleLoaders
   * @desc adjust style loaders
   */
  styleLoaders: () => (config, env) => {
    const adjustSassProcessor = ({ use: [, , , , processor] }) => {
      // pre-processor
      if (processor && processor.loader.includes('sass-loader')) {
        processor.options.prependData = jsToSassVariables(styleVars);
      }
    };
    return adjustStyleLoaders(adjustSassProcessor)(config, env);
  },
};

module.exports = customizers;
