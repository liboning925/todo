const path = require("path")
const base = require("./webpack.config.base")
const merge = require("webpack-merge")
module.exports = merge(base, {
    mode: "development",
    // devtool: "source-map",
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    {
                        loader: 'style-loader'
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
                        loader: 'style-loader'
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
                    loader: 'style-loader'
                }, {
                    loader: 'css-loader'
                }, {
                    loader: ' sass-loader'

                }]
            },

        ]
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 9000,
        proxy: {
            "/data": {
                "target": "http://www.bjlink32.com/data.php",
                "changeOrigin": true,
                "pathRewrite": { "^/data": "" }
            }
        }
    },

})
