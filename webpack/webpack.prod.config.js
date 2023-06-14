const common = require ('./webpack.common.config.js')
const { merge } = require('webpack-merge')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin') 

module.exports = merge(common, {
    output: {
        filename: 'js/[name].[contenthash:12].js'
    },
    mode: 'production',
    optimization: {
        minimize: true,
        minimizer: [
            `...`,
            new ImageMinimizerPlugin({
                minimizer: {
                    implementation: ImageMinimizerPlugin.imageminMinify,
                    options: {
                        plugins: [
                            ['imagemin-mozjpeg', {quality: 40}],
                            ['imagemin-pngquant',{
                                quality: [0.65, 0.90],
                                speed: 4
                            }],
                        ]
                    }
                }
            })
        ]
    },
    module: {
        rules: [
            {
              test: /\.css$/,
              use: [ MiniCssExtractPlugin.loader, 'css-loader' ]  
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
                    filename: './images/[name].[contenthash:12][ext]'
                }
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash:12].css'
        })
    ]
})