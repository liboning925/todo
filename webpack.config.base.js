const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const webpackBar = require("webpackbar")
module.exports = {
    entry: {
        index: "./src/index.js",
        one: "./src/one.js"
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name]_[hash].main.js'
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',

                }
            },
            // {
            //     test: /\.(gif|jpe?g|png)$/,
            //     use: [
            //         {
            //             loader: 'file-loader',
            //             options: {
            //                 name: '[name].[ext]',
            //                 publicPath: './../img',
            //                 outputPath: 'img/'
            //             }
            //         },
            //         {
            //             loader: 'image-webpack-loader'
            //         }
            //     ]
            // }
            {
                test: /\.(gif|jpe?g|png)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            publicPath: './../img',
                            outputPath: 'img/',
                            limit: 8192
                        }
                    }
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'fonts/',
                            publicPath: './../fonts'
                        }
                    }
                ]
            }

        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "首页",
            filename: "index.html",
            template: "./public/index.html",
            chunks: ["index"]
        }),
        new HtmlWebpackPlugin({
            title: "one",
            filename: "one.html",
            template: "./public/one.html",
            chunks: ["one"]
        }),
        new CleanWebpackPlugin(),
        new webpackBar()
    ],
    resolve: {
        extensions: ['.jsx', '.less', '.js', '.css']
    }

}
