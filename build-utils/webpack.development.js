const path = require('path')
const BrowserSyncPlugin = require('browser-sync-webpack-plugin')
const webpack = require('webpack')

module.exports = () => ({
    devtool: 'source-map',

    module: {
        rules: [
            {
                test: /\.js$/,
                include: [path.resolve(__dirname, 'src/js/')],
                use: [
                    'babel-loader',
                    'eslint-loader'
                ]
            }
        ]
    },

    plugins: [
        new BrowserSyncPlugin({
            host: 'localhost',
            port: 9000,
            server: {
                baseDir: ['./dist']
            }
        }),
        new webpack.HotModuleReplacementPlugin()
    ]
})
