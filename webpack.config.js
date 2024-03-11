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
			{
				test: /\.[jt]sx?$/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-typescript'],
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
