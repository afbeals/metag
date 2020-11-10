// External
const { override, addWebpackAlias } = require('customize-cra');

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
    styleLoaders()
  ),
};
