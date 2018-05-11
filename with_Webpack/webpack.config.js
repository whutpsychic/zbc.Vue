var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var config = {
	entry: { main: './demo/main' },
	output: {
		path: path.join(__dirname, './dist'),

		//路径(如果编译后想本地打开，则降至改为'./dist/')
		publicPath: '/dist/',

		filename:'main.js'
	},
	module: {

		//
		rules: [
			{
				test: /\.(gif|jpg|png|woff|svg|eot|ttf)$/,
				loader:"url-loader?limit=1024&name=images/[hash:8].[name].[ext]"
			},
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
