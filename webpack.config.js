const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');

module.exports = {
  entry: ['./src/index.js'],
  output: {
    filename: 'vue-affix.min.js',
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist/',
    library: {
      root: 'vueAffix',
      amd: 'vue-affix',
      commonjs: 'vue-affix',
    },
    libraryTarget: 'umd',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'eslint-loader'],
      },
      {
        test: /\.vue$/,
        use: ['vue-loader', 'eslint-loader'],
      },
      {
        test: /\.css$/,
        use: ['vue-style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [new VueLoaderPlugin()],
};
