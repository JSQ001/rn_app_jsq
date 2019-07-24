export  default {
  entry: "src/index.js",
  disableCSSModules: false,
  cssModulesExclude: [],
  publicPath: "/",
  outputPath: "./dist",
  extraBabelPlugins: [],
  extraPostCSSPlugins: [],
  sass: false,
  hash: false,
  autoprefixer: null,
  port: 3000,
  proxy: {
    "/api": {
      "target": "http://jsonplaceholder.typicode.com/",
      "changeOrigin": true,
      "pathRewrite": { "^/api" : "" }
    }
  },
  externals: null,
  library: null,
  libraryTarget: "var",
  multipage: false,
  define: {

  },
  env: {
    port: 300
  },
  theme: null,
}
