const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = {
    entry: { // 可以打包多个入口文件
        main: './src/index.js',
        sub: './src/index.js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/index.htm'
        }),
        new CleanWebpackPlugin(['dist'])
    ],
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
                test: /\.scss/,
                /*
                	css-loader会分析出css文件之间的关系(例如在css文件里import别的css文件),合并成一个css，
                	style-loader把合并出的css再挂载到head里
                	sass-loader处理sass文件
                */
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 2,  //当sass文件里引入别的sass文件时，会重复下面2步loader过程，而不是直接使用css-loader
                            modules: true  // 使css打包模块化
                        }
                    },
                    'sass-loader',
                    'postcss-loader' // 为css3自动添加各厂商前缀
                ]  // loader是有执行顺序的，从右到左执行
            },
            {
                test: /\.css/,
                use: [
                    'style-loader',
                    'css-loader',
                    'postcss-loader' // 为css3自动添加各厂商前缀
                ]  // loader是有执行顺序的，从右到左执行
            },
            {
                test: /\.vue$/,
                use: {
                    loader: 'vue-loader'
                }
            }
        ]
    },
    output: {
        publicPath: 'http://cdn.com.cn', // html引入打包生成的js文件路径之前加上的前缀
        filename: '[name].js', // name对应entry配置的名字生成js文件
        path: path.resolve(__dirname, 'bundle')
    }
}