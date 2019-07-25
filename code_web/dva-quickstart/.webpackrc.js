const path = require("path");

export default {
  entry: "src/index.js",
  extraBabelPlugins: [
    ["import", { libraryName: "antd", libraryDirectory: "es", style: true }]
  ],
  env: {
    development: {
      extraBabelPlugins: ["dva-hmr"]
    }
  },
  externals: {
    rollbar: "rollbar"
  },
  alias: {
    components: path.resolve(__dirname, "src/components/"),
    config: path.resolve(__dirname, "src/config/config.js"),
    images: path.resolve(__dirname, "src/images/"),
    styles: path.resolve(__dirname, "src/styles/"),
    routes: path.resolve(__dirname, "src/routes/"),
    containers: path.resolve(__dirname, "src/containers/"),
    widget: path.resolve(__dirname, "src/components/Widget/"),
    utils: path.resolve(__dirname, "src/utils/"),
    chooserData: path.resolve(__dirname, "src/chooser-data/index.js"),
    share: path.resolve(__dirname, "src/share/"),
    services: path.resolve(__dirname, "src/services/"),
    template: path.resolve(__dirname, "src/components/Template/"),
    "@": path.resolve(__dirname, "src")
  },
  ignoreMomentLocale: true,
  //theme: "./src/theme.js",
  html: {
    template: "./src/index.ejs"
  },
  lessLoaderOptions: {
    javascriptEnabled: true
  },
  //disableCSSModules: true,
  disableDynamicImport: true,
  es5ImcompatibleVersions: true,
  publicPath: "/",
  hash: true,
  proxy: {
    "/api": {
      target: "http://localhost:8080",
      changeOrigin: true
    },
  }
};

