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
        library: ['vue-affix'],
        libraryTarget: 'umd'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
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
