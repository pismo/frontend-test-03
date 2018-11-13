const path = require('path')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = () => ({
    module: {
        rules: [
            {
                test: /\.js$/,
                include: [path.resolve(__dirname, 'src/js/')],
                use: [
                    'babel-loader'
                ]
            }
        ]
    },

    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                uglifyOptions: {
                    ecma: 8,
                    warnings: false,
                    booleans: true,
                    sequences: true,
                    dead_code: true,
                    conditionals: true,
                    unused: true,
                    if_return: true,
                    join_vars: true,
                    drop_console: true,
                    output: {
                        comments: false,
                        beautify: false
                    }
                }
            })
        ]
    }
})
