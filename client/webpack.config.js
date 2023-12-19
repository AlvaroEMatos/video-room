const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
  },
  devServer:{
    static: {
      directory: path.join(__dirname, 'public'),
    },
    hot: true,
    port: 9000,
  },
  module:{
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.html$/,
        exclude: /node_modules/,
        use: {
          loader: "html-loader"
        }
      },
    ],
  },
  optimization : {
    minimizer: [new CssMinimizerPlugin()],
    realContentHash: false,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html'
    }),
  ]
};