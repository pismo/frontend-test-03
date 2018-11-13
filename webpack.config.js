const path = require('path')
const webpackMerge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

const modeConfig = env => require(`./build-utils/webpack.${env}`)(env)
const presetConfig = require('./build-utils/loadPresets')

module.exports = ({ mode, presets } = { mode: 'production', presets: [] }) => {
    return webpackMerge(
        {
            mode,
            entry: ['@babel/polyfill', path.resolve(__dirname, 'src/js/Main.js')],
            output: {
                path: path.resolve(__dirname, 'dist/'),
                filename: 'bundle.js',
                chunkFilename: '[name].bundle.js',
                publicPath: '/'
            },

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

            plugins: [
                new CleanWebpackPlugin(['dist'], { verbose: true }),
                new HtmlWebpackPlugin({
                    title: 'Pismo Front End Challenge',
                    filename: 'index.html',
                    template: './src/index.html',
                    inject: 'head',
                    minify: {
                        collapseWhitespace: true
                    }
                })
            ]
        },
        modeConfig(mode),
        presetConfig({ mode, presets })
    )
}
