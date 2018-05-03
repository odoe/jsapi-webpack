const ArcGISPlugin = require("@arcgis/webpack-plugin");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const path = require("path");
const webpack = require("webpack");

module.exports = {
  entry: {
    index: "./src/index.js"
  },
  output: {
    filename: "[name].bundle.js",
    publicPath: ""
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            cacheDirectory: true
          }
        }
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
      }
    ]
  },

  plugins: [
    new ArcGISPlugin(),
    new HtmlWebPackPlugin({
      title: "My ArcGIS Webpack App",
      chunksSortMode: "none"
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    })
  ],

  resolve: {
    modules: [path.resolve(__dirname, "/src"), "node_modules/"],
    extensions: [".js", ".scss"]
  },

  externals: [
    (context, request, callback) => {
      if (/pe-wasm$/.test(request)) {
        return callback(null, "amd " + request);
      }
      callback();
    }
  ],

  node: {
    process: false,
    global: false
  }
};