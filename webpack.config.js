//const path=require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

//var merge = require('merge');
//var parts = require('parts');
// const productionConfig = merge([
//   ...
//
//   parts.loadImages({
//     options: {
//       limit: 15000,
//       name: "[name].[ext]",
//     },
//   }),
//
// ]);
//
// const developmentConfig = merge([
//   ...
//
//   parts.loadImages(),
//
// ]);
module.exports = {
  entry: './src/index.js',
  devtool: 'inline-source-map'
,
  output: {
    path: __dirname + '/dist',
    filename: 'bundle.js'
  },
  module: {
    rules: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.css$/, use:[{loader:'style-loader'},{loader:'css-loader'}], exclude: /node_modules/ },
      {
        test: /\.(svg|png|jpg|jpeg|gif)$/,
        use: {
          loader: "url-loader",
          options: {
            limit: 25000,
          },
        },
      },
      {
        test: /\.(svg|png|jpg|jpeg|gif)$/,
        use: {
          loader: "file-loader",
          options: {
            name: "[path][name].[ext]",
          },
        },
      },
    //   {
    //   test: /\.(jpe?g|png|gif|svg)$/i,
    //   loader: "file-loader?name=/img/[name].[ext]"
    // },
      { test: /\.html$/, loader: 'raw-loader', exclude: /node_modules/ }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'index',
      template: 'index.html',
    }),
    new CopyWebpackPlugin([
      { from: './public/boards.html', to: './boards.html' }
    ]),
    new CopyWebpackPlugin([
      { from: './public/landing.html', to: './landing.html' }
    ])
    // new HtmlWebpackPlugin({
    //   title: 'boards',
    //   template: 'public/boards.html',
    //   chunks: ['boardsEntry']
    // }),
    // new HtmlWebpackPlugin({
    //   title: 'landing',
    //   template: 'public/landing.html',
    //   chunks: ['landingEntry']
    // })
],
mode: 'development',
};
