const common = require ('./webpack.common.config.js')
const { merge  } = require('webpack-merge')
const path = require ('path')

module.exports =merge(common, {
    output: {
        filename: 'bundle.js'
    },
    mode: 'development',
    devServer: {
        port: 9000,
        static: {
            directory: path.resolve(__dirname, '../dist')
        },
        devMiddleware: {
            index: 'index.html',
            writeToDisk: true
        },
        client: {
            overlay: true
        },
        liveReload: true
    },
    module: {
        rules: [
            {
              test: /\.css$/,
              use: [ 'style-loader', 'css-loader' ]  
            },
            {
                test: /\.(png|jpg|svg)$/,
                type: 'asset',
                parser: {
                    dataUrlCondition: {
                        maxSize: 10 * 1024,
                    }
                },
                generator: {
                    filename: './images/[name][ext]'
                }
            }
        ]
    }
})