const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'static/js/[name].bundle.js',
  },
  devServer:{
    static: {
      directory: path.join(__dirname, 'public'),
    },
    proxy: {
      '/': {
        target: 'http://localhost:3000',
        secure: false,
      }
    },
    headers: {
      'Cache-Control': 'no-store',
    },
    hot: true,
    port: 3333,
  },
  module:{
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      },
      {
        test: /\.html$/,
        loader: "html-loader",
      },
      {
        test: /\.css$/,
        generator:{
          filename: 'static/css/[name][ext]',
        }
      },
      {
        test: /\.(png|jpeg|jpg|webp|gif|ico|mp3|mp4)$/,
        generator:{
          filename: 'static/resources/[name][ext]',
        }
      },
    ],
  },
  optimization: {
    minimizer: [
      new CssMinimizerPlugin(),
      new TerserPlugin(),
    ],
    realContentHash: false,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ]
};