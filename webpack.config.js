const path = require('path');
const webpack = require('webpack');

module.exports = (env, argv) => ({
	mode: argv.mode === 'production' ? 'production' : 'development',

	devtool: argv.mode === 'production' ? false : 'inline-source-map',
	entry: {
		code: './src/code.ts'
	},
	module: {
		rules: [
			// {
			// 	test: /\.ts$/,
			// 	exclude: /(node_modules|bower_components)/,
			// 	use: {
			// 		loader: 'swc-loader',
			// 		options: {
			// 			minify: true,
			// 			jsc: {
			// 				parser: {
			// 					syntax: 'typescript'
			// 				},
			// 				loose: true
			// 			}
			// 		}
			// 	}
			// },
			{
				test: /\.tsx?$/,
				use: 'ts-loader',
				exclude: /node_modules/
			},
			{
				test: /\.[jt]sx?$/,
				use: {
					loader: 'babel-loader',
					options: {
						plugins: ['@babel/plugin-transform-object-rest-spread']
					}
				}
			}
		]
	},
	resolve: {
		extensions: ['.ts', '.js']
	},
	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, 'dist')
	}
});
