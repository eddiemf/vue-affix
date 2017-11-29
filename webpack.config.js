var path = require('path');
var webpack = require('webpack')
var PROD = (process.env.NODE_ENV === 'production');

module.exports = {
  entry: {
    'vue-affix.js': './src/index.js',
    'vue-affix.min.js': './src/index.js'
  },
  output: {
    filename: '[name]',
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist/',
    library: {
      root: "vueAffix",
      amd: "vue-affix",
      commonjs: "vue-affix",
    },
    libraryTarget: 'umd',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.vue$/,
        use: {
          loader: 'vue-loader'
        }
      }
    ]
  },
  plugins: PROD ? [
  new webpack.optimize.UglifyJsPlugin({
    include: /\.min\.js$/,
    minimize: true
  })
  ] : []
}
