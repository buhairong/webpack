const merge = require('webpack-merge')
const commonConfig = require('./webpack.common')

const prodConfig = {
	mode: 'production',
    /*
    	当代码有错误时，sourceMap会映射到原文件的代码行，而不是显示打包后js的代码行，
    	使用sourceMap,打包速度会变慢，在开发时用，打包产品时去掉
	*/
    // devtool: 'cheap-module-eval-source-map', // 开发时使用cheap-module-eval-source-map,打包效率较快，信息比较全面
    devtool: 'cheap-module-eval-source-map' // 如果上线时需要快速定位问题代码，可以使用cheap-module-source-map,提示信息会更全面
}

module.exports = merge(commonConfig, prodConfig)