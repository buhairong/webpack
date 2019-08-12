const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const webpack = require('webpack')

module.exports = {
    entry: { // 可以打包多个入口文件
        main: './src/index.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/, // 对第三方库的js文件不使用babel-loader
                loader: 'babel-loader'
            },
            {
                test: /\.(jpg|png|gif)$/,
                use: {
                    loader: 'url-loader'  // url-loader可以将图片转换成Base64编码以减少一次http请求
                },
                options: {
                    name: '[name]_[hash].[ext]',
                    outputPath: 'images/',
                    limit: 2048  // 当图片小于2K时，将图片转换成Base64编码，当图片大于2K时，打包成图片文件
                }
            },
            {
                test: /\.(eot|ttf|svg)$/,
                use: {
                    loader: 'file-loader'  // file-loader处理字体文件
                }
            },
            {
                test: /\.vue$/,
                use: {
                    loader: 'vue-loader'
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/index.htm'
        }),
        new CleanWebpackPlugin(['dist'], {
            root: path.resolve(__dirname, '../')
        }),
        new webpack.ProvidePlugin({
            $: 'jquery'  // 这样配置，在各模块都可以使用
        })
    ],
    optimization: {
        runtimeChunk: {
            name: 'runtime' // 当代码没有改变时，文件名哈希值不会变。webpack4以上不用配置
        },
        usedExports: true,
        /*
            代码分割
            webpack中实现代码分割，两种方式
            1. 同步代码：只需要在 webpack.common.js 中做optimization的配置
            2. 异步代码(import)：异步代码，无需做任何配置，会自动进行代码分割
        */
        splitChunks: {
            chunks: 'all', // all 对同步和异步引入代码都进行代码分割
            minSize: 30000, // 引入的库大于30000字节时，进行代码分割
            minChunks: 1, // 当引入的库被引入的次数大于1时，进行代码分割
            maxAsyncRequests: 5, // 最多分割成5个JS
            maxInitialRequests: 3, // 首页引入文件最多分割成3个JS
            automaticNameDelimiter: '~', // 文件自动生成时的连接符
            name: true, // 打包生成的文件名可以使用cacheGroups里filename指定的文件名
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/, // 检查引入文件是否在node_modules里，如果是，进行代码分割
                    priority: -10, // 当一个引入的库同时满足vendors和default的要求时，看priority优先级，值越大，优先级越高
                    filename: 'vendors.js' //指定引入文件生成的JS文件名
                },
                default: {
                    priority: -20,
                    reuseExistingChunk: true, // 忽略已经被引入的模块
                    filename: 'common.js'
                }
            }
        }
    },
    //performance: false, // 去掉打包时提示性能的警告
    output: {
        //publicPath: 'http://cdn.com.cn', // html引入打包生成的js文件路径之前加上的前缀
        path: path.resolve(__dirname, '../dist')
    }
}