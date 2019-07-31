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
					name: '[name]_[hash].[ext]',  // ʹ��ԭ�����ļ���  hashΪ��ϣֵ placeholder ռλ�� 
					outputPath: 'images/'
				}
			},
			{
				test: /\.(jpg|png|gif)$/,
				use: {
					loader: 'url-loader'  // url-loader���Խ�ͼƬת����Base64�����Լ���һ��http����
				},
				options: {
					name: '[name]_[hash].[ext]',  
					outputPath: 'images/',
					limit: 2048  // ��ͼƬС��2Kʱ����ͼƬת����Base64���룬��ͼƬ����2Kʱ�������ͼƬ�ļ�
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