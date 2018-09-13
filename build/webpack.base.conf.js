'use strict'
const utils = require('./utils')
const path = require('path')
const webpack = require('webpack')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const ManifestPlugin = require('webpack-manifest-plugin')

module.exports = {
  entry: {
    app: './src/index.js',
    otherapp: './src/appindex.js'
  },
  output: {
    path: utils.resolve('dist'),
    filename: '[name].[hash:7].js',
    chunkFilename: '[name].[chunkhash:4].js',
    // publicPath: '/',
    library: '[name]',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  optimization: {
    runtimeChunk: 'single',
    // removeEmptyChunks: false,
    splitChunks: {
      chunks: 'all',
      name: 'doubleChunks',
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    }
  },
  plugins: [
    new VueLoaderPlugin(),
    new CleanWebpackPlugin(utils.resolve('dist')),
    new HtmlWebpackPlugin({
      title: 'My App',
      inject: true,
      filename: 'index.html',
      template: 'template.html',
      chunks: ['runtime', 'app', 'vendors', 'doubleChunks'],
      meta: {viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no'}
    }),
    new HtmlWebpackPlugin({
      title: 'My App',
      inject: true,
      filename: 'otherapp.html',
      template: 'template.html',
      chunks: ['runtime', 'otherapp', 'vendors', 'doubleChunks'],
      meta: {viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no'}
    }),
    new ManifestPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.HashedModuleIdsPlugin()
  ],
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': utils.resolve('src')
    }
  }
}