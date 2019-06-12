const path = require('path');

module.exports = {
	entry: "./src/index.js",
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
					options: {
						presets: ['@babel/preset-env', "@babel/preset-react", {
							'plugins': ['@babel/plugin-proposal-class-properties']}
						]
					}
				}
			},
			{
				test: /\.html$/,
				use: ["html-loader"]
			},
			{
				test: /\.(svg|png|jpe?g|gif)$/,
				use: {
					loader: "file-loader",
					options: {
						name: "[folder]/[name]-[hash].[ext]",
						outputPath: "images"
					}
				}
			}
		]
	}
}