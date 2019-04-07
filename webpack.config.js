const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');

module.exports = {
  context: path.resolve(__dirname, 'src'),
  entry: {
    'vue-affix': path.resolve(__dirname, 'src/vue-affix.js'),
    demo: path.resolve(__dirname, 'src/demo/demo.js'),
  },
  output: {
    filename: '[name].min.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/dist/',
    library: {
      root: 'vueAffix',
      amd: 'vue-affix',
      commonjs: 'vue-affix',
    },
    libraryTarget: 'umd',
  },
  resolve: {
    alias: {
      vue: 'vue/dist/vue.js',
    },
  },
  devServer: {
    contentBase: './src/demo',
    stats: 'errors-only',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.vue$/,
        exclude: /node_modules/,
        use: ['vue-loader'],
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: ['vue-style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [new VueLoaderPlugin()],
};
