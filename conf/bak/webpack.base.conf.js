'use strict'
const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const ManifestPlugin = require('webpack-manifest-plugin')
const webpack = require('webpack')
module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].[hash:7].js',
    chunkFilename: '[name].[chunkhash].js',
    // publicPath: '/',
    library: 'sign',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  plugins: [
    new VueLoaderPlugin(),
    new CleanWebpackPlugin([path.resolve(__dirname, '../dist')]),
    new HtmlWebpackPlugin({
      title: 'Output Management',
    }),
    new ManifestPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.HashedModuleIdsPlugin()
  ],
  externals: {
    Vue: "vue"
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src')
    }
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    }
  }
};