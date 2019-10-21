// webpack.config.js
const path = require('path')
module.exports = {

  resolve:{

    plugins:[
      {
        test: /\.(eot|woff2?|ttf|svg)$/,
        exclude: path.resolve(__dirname, "../src/icons"), //不处理指定svg的文件(所有使用的svg文件放到该文件夹下)
        use: [
          {
            loader: "url-loader",
            options: {
              name: "[name]-[hash:5].min.[ext]",
              limit: 5000, // fonts file size <= 5KB, use 'base64'; else, output svg file
              outputPath: "font",
              publicPath: "font"
            }
          }
        ]
      },

      {
        test: /\.svg$/,
        loader: "svg-sprite-loader",
        include: path.resolve(__dirname, "./src/icons"), //只处理指定svg的文件(所有使用的svg文件放到该文件夹下)
        options: {
          symbolId: "icon-[name]" //symbolId和use使用的名称对应      <use xlinkHref={"#icon-" + iconClass} />

        }
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              includePaths: [path.join(__dirname, './srasset/css')]
            }
          }
        ]
      },

    ],
    alias: {
      components: path.resolve(__dirname, "src/components/"),
      assets: path.resolve(__dirname, "src/assets/"),
      config: path.resolve(__dirname, "src/config/config.js"),
      images: path.resolve(__dirname, "src/images/"),
      styles: path.resolve(__dirname, "src/styles/"),
      routes: path.resolve(__dirname, "src/routes/"),
      containers: path.resolve(__dirname, "src/containers/"),
      widget: path.resolve(__dirname, "src/components/Widget/"),
      utils: path.resolve(__dirname, "src/utils/"),
      share: path.resolve(__dirname, "src/share/"),
      services: path.resolve(__dirname, "src/services/"),
      template: path.resolve(__dirname, "src/components/Template/"),
      "@": path.resolve(__dirname, "src")
    },
  }
}
