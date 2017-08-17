var path = require('path');
var webpack = require('webpack');

module.exports = {
    //devtool:'inline-source-map',
    entry: {
        bundle: './src/test.js',
        vendor: ['leaflet', 'zrender']
    },
    output: {
        path: __dirname + '/dist/',
        filename: '[name].js',
    },
    module: {
        loaders: [
            {
                test: /\.css$/,
                loader: 'css-loader'
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/,
                loader: 'file-loader'
            },
        ]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({name: 'vendor', filenmae: 'vendor.js'}),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ]
}