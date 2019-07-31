const path = require('path')

module.exports = {
	mode: 'production', //development
	entry: './index.js',
	module: {
		rules: [
			{
				test: /\.(jpg|png|gif)$/,
				use: {
					loader: 'file-loader'
				},
				options: {
					name: '[name]_[hash].[ext]',  // 使用原来的文件名  hash为哈希值 placeholder 占位符 
					outputPath: 'images/'
				}
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
				test: /\.vue$/,
				use: {
					loader: 'vue-loader'
				}
			}
		]

	},
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'bundle')
	}
}