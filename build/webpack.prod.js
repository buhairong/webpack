const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const merge = require('webpack-merge')
const commonConfig = require('./webpack.common')

const prodConfig = {
	mode: 'production',
    /*
    	当代码有错误时，sourceMap会映射到原文件的代码行，而不是显示打包后js的代码行，
    	使用sourceMap,打包速度会变慢，在开发时用，打包产品时去掉
	*/
    // devtool: 'cheap-module-eval-source-map', // 开发时使用cheap-module-eval-source-map,打包效率较快，信息比较全面
    devtool: 'cheap-module-eval-source-map', // 如果上线时需要快速定位问题代码，可以使用cheap-module-source-map,提示信息会更全面
    module: {
        rules: [
            {
                test: /\.scss/,
                /*
                	css-loader会分析出css文件之间的关系(例如在css文件里import别的css文件),合并成一个css，
                	style-loader把合并出的css再挂载到head里
                	sass-loader处理sass文件
                */
                use: [
                    //'style-loader',
                    MiniCssExtractPlugin.loader, // CSS代码分割
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
                    //'style-loader',
                    MiniCssExtractPlugin.loader, // CSS代码分割
                    'css-loader',
                    'postcss-loader' // 为css3自动添加各厂商前缀
                ]  // loader是有执行顺序的，从右到左执行
            },
        ]
    },
    optimization: {
        minimizer: [new OptimizeCssAssetsWebpackPlugin({})] // 对CSS代码进行压缩
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[name].chunk.css'
        })
    ],
    output: {
        filename: '[name].[contenthash].js', // name对应entry配置的名字生成js文件  contenthash根据content如有改变，产生新的哈希值
        chunkFilename: '[name].[contenthash].js' // name对应entry配置的名字生成js文件
    }
}

module.exports = merge(commonConfig, prodConfig)