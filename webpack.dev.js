const path = require('path');
const common = require('./webpack.common');
const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(common, {
	mode: "development",
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "[name].bundle.js",
		publicPath: '/'
	},
	module: {
		rules: [
			{
				test: /\.s?css$/,
				use: [
					{
						loader: "style-loader", // 2. Inject styles into DOM
					},
					{
						loader: "css-loader", // 1. Turns css into commonjs
					},
					{
						loader: "sass-loader", // 3. Turns scss into commonjs
					}
				]
			}
		]
	},
	devServer: {
		historyApiFallback: true,
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: "./src/index.html"
		})
	]
});
