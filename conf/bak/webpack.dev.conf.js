'use strict'
const path = require('path')
const merge = require('webpack-merge')
const base = require('./webpack.base.conf')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = merge(base, {
  mode: "development",
  devtool: 'inline-source-map',
  resolve:{
    alias:{
      'vue':'vue/dist/vue.js'
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src')]
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: "style-loader"
          }, 
          {
            loader: "css-loader"
          }, 
          {
            loader: "less-loader", options: {
              strictMath: true,
              noIeCompat: true
            }
          }
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'img/[name].[hash:7].[ext]'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'fonts/[name].[hash:7].[ext]'
        }
      }
    ]
  }
})