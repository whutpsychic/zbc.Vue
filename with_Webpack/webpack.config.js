var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var config = {
	entry: { main: './demo/main' },
	output: {
		path: path.join(__dirname, './dist'),
		publicPath: '/dist/',
		filename:'main.js'
	},
	module: {

		//
		rules: [
			{
				test: /\.css$/,
				//use:['style-loader','css-loader'],
				use: ExtractTextPlugin.extract({
					use: 'css-loader',
					fallback:'style-loader'
				})
			},
			{
				test: /.vue$/,
				loader: 'vue-loader',
				options: {
					loaders: {
						css: ExtractTextPlugin.extract({
							use: 'css-loader',
							fallback:'vue-style-loader'
						})
					}
				}
			},
			{
				test: /.js$/,
				loader: 'babel-loader',
				exclude:/node_modules/
			}
		]
	},
	plugins: [new ExtractTextPlugin("main.css")]
};

module.exports = config;
