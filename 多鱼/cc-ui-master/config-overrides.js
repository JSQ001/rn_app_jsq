const {
  override,
  addDecoratorsLegacy,
  disableEsLint,
  addBundleVisualizer,
  addWebpackAlias,
  adjustWorkbox,
  fixBabelImports
} = require("customize-cra");

const path = require("path");

const webpackConfig = require('./webpack.config');
const addWebpackModules = () => (config, env) => {
  console.log(config)

  config.resolve.alias={
      ...config.resolve.alias,
      ...webpackConfig.resolve.alias
  };
  return config
};
module.exports = override(
    addWebpackModules(),
    addDecoratorsLegacy(),
    fixBabelImports("babel-plugin-import", {
      libraryName: "antd-mobile",
      style: "css"
    })
);
