'use strict'
const baseConf = require('./webpack.base.conf')
const utils = require('./utils')
const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')

module.exports = merge(baseConf, {
  devtool: '#source-map',
  mode: "production",
  module: {
    rules: [
      {
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [utils.resolve('src')],
        options: {
          formatter: require("eslint-friendly-formatter")
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        include: [utils.resolve('src')]
      },
      {
        test: /\.(pdf)(\?.*)?$/,
        loader: 'file-loader',
        options: {
          name: utils.resolve('terms/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(jpeg?|jpg|png|gif)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.resolve('image/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.resolve('fonts/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(scss?|sass)(\?.*)?$/,
        use: [
          'vue-style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'sass-loader',
            options: {
              indentedSyntax: true
            }
          }
        ]
      },
      {
        test: /\.(less)(\?.*)?$/,
        use: [
          'vue-style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'less-loader',
            options: {
              strictMath: true,
              noIeCompat: true
            }
          }
        ]
      }
    ]
  }
})