const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

console.log('ttt');
console.log(__dirname);

const paths = {
  src: path.resolve(__dirname, 'src'),
  template: path.resolve(__dirname, 'src', 'index.html'),
  out: path.resolve(__dirname, 'out')
};

module.exports = {
  context: paths.src,
  entry: ['./main.js'],
  output: {
    path: paths.out,
    filename: '[hash].js'
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },

      {
        test: /\.(png|jpg|gif|svg|woff|woff2|swf|ttf|eot)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]'
        }
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({ template: paths.template }),
    new webpack.NoEmitOnErrorsPlugin()
  ]
};
