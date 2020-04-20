const path = require("path")
const base = require("./webpack.config.base")
const merge = require("webpack-merge")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
module.exports = merge(base, {
    mode: "porduction",
    module: {
        rules: [

            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    {
                        loader: 'css-loader',
                        // options: {
                        //     modules: true,
                        // }
                    }
                ]
            },
            {
                test: /\.less$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    }, {
                        loader: 'css-loader'
                    }, {
                        loader: 'less-loader'
                    }
                ]
            },
            {
                test: /\.scss$/,
                use: [{
                    loader: MiniCssExtractPlugin.loader
                }, {
                    loader: 'css-loader'
                }, {
                    loader: ' sass-loader'

                }]
            },

        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/[name]-[hash].css',
            chunkFilename: '[id].css'
        })
    ],

})
