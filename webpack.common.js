const webpack = require('webpack')
const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
// const config = require(path.resolve(__dirname, 'config/theme.json'))

module.exports = {
  node: {
    fs: 'empty'
  },
  
  plugins: [
    new VueLoaderPlugin(),
    new CleanWebpackPlugin([
      path.resolve(__dirname, 'server/private/craft', 'templates'),
      path.resolve(__dirname, 'server/public', 'dest'),
    ]),
    new CopyWebpackPlugin([{
      from: path.resolve(__dirname, 'templates'),
      to: path.resolve(__dirname, 'server/private/craft', 'templates')
    }, {
      from: path.resolve(__dirname, 'src', 'includes'),
      to: ''
    }]),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: 'css/[name].css',
      chunkFilename: 'css/[id].css'
    })
  ],

  module: {
    rules: [{
      test: /\.ts$/,

      include: [path.resolve(__dirname, 'src')],

      use: {
        loader: 'babel-loader',
        loader: 'ts-loader',
      }
    }, {
      test: /\.js$/,

      include: [path.resolve(__dirname, 'src')],

      loader: 'babel-loader',
    }, {
      test: /\.vue$/,
      loader: 'vue-loader'
    }, {
      test: /\.(css|pcss)$/,

      use: [{
        loader: MiniCssExtractPlugin.loader,
        options: {
          publicPath: (resourcePath, context) => {
            // publicPath is the relative path of the resource to the context
            // e.g. for ./css/admin/main.css the publicPath will be ../../
            // while for ./css/main.css the publicPath will be ../
            return path.relative(path.dirname(resourcePath), context) + '/'
          }
        }
      }, {
        loader: 'css-loader',
        options: {
          importLoaders: 1,
          sourceMap: true
        }
      }, {
        loader: 'postcss-loader'
      }]
    }, {
      test: /\.(svg|png|jpg)$/,

      use: {
        loader: 'file-loader',
        options: {
          name: 'images/[name].[ext]',
          publicPath: '../'
        }
      }
    }]
  },

  resolve: {
    extensions: ['.js', '.ts'],
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },

  entry: {
    main: './src/index.js',
    styleguide: './src/styleguide.js',
  },

  output: {
    path: path.resolve(__dirname, 'server/public', 'dest'),
    filename: 'js/[name].js'
  },

  mode: 'development',
}
