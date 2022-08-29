const path = require('path')
const webpack = require('webpack')

module.exports = {
    entry: './src/index.js',
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules)/,
                loader: 'babel-loader',
                options: { presets: ['@babel/env'] },
            },
            {
                test: /\.sass$/,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
        ],
    },
    resolve: { extensions: ['*', '.js', '.jsx'] },
    output: {
        path: path.resolve(__dirname, 'dist/'),
        filename: 'bundle.js',
        library: 'andrewlor.me',
        libraryTarget: 'umd',
    },
    devServer: {
        port: 3000,
        host: 'localhost',
    },
    plugins: [
        new webpack.DefinePlugin({
            READ_ONLY_AIRTABLE_API_KEY: process.env.READ_ONLY_AIRTABLE_API_KEY,
        }),
    ],
}
