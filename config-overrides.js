// External
const {
  override,
  addWebpackAlias,
  removeModuleScopePlugin,
} = require('customize-cra');

// Internal
const {
  aliasRoutes,
  bundleVisualizer,
  styleLoaders,
} = require('./config/customizers');

module.exports = {
  webpack: override(
    addWebpackAlias(aliasRoutes),
    bundleVisualizer(),
    removeModuleScopePlugin(),
    styleLoaders()
  ),
};
