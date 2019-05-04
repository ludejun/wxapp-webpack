import { resolve } from 'path';
import {
	DefinePlugin,
	EnvironmentPlugin,
	IgnorePlugin,
	optimize,
} from 'webpack';
import WXAppWebpackPlugin from 'wxapp-webpack-plugin';
import StylelintPlugin from 'stylelint-webpack-plugin';
import MinifyPlugin from 'babel-minify-webpack-plugin';
import CopyPlugin from 'copy-webpack-plugin';
import pkg from './package.json';

const { NODE_ENV, LINT } = process.env;
const isDev = NODE_ENV !== 'production';
const shouldLint = !!LINT && LINT !== 'false';
const srcDir = resolve('src');

const copyPatterns = []
	.concat(pkg.copyWebpack || [])
	.map(
		(pattern) =>
			typeof pattern === 'string' ? { from: pattern, to: pattern } : pattern,
	);

export default (env = {}) => {
	const min = env.min;

	const relativeFileLoader = (ext = '[ext]') => {
		// const namePrefix = isWechat ? '' : '[path]';
		return {
			loader: 'file-loader',
			options: {
				// useRelativePath: isWechat,
				useRelativePath: true,
				// name: `${namePrefix}[name].${ext}`,
				name: `[name].${ext}`,
				context: srcDir,
			},
		};
	};

	return {
		entry: {
			app: [
				// add promise polyfill into wechat mini program
				`es6-promise/dist/es6-promise.auto${isDev ? '.min' : ''}.js`,
				'./src/app.js',
			].filter(Boolean),
		},
		output: {
			filename: '[name].js',
			publicPath: '/',
			path: resolve(isDev ? 'dist' : 'release'),
		},
		// target: Targets[target],
		module: {
			rules: [
				{
					test: /\.js$/,
					include: /src/,
					exclude: /node_modules/,
					use: ['babel-loader', shouldLint && 'eslint-loader'].filter(Boolean),
				},
				{
					test: /\.wxs$/,
					include: /src/,
					exclude: /node_modules/,
					use: [
						relativeFileLoader(),
						'babel-loader',
						shouldLint && 'eslint-loader',
					].filter(Boolean),
				},
				{
					test: /\.(scss|wxss)$/,
					include: /src/,
					use: [
						relativeFileLoader('wxss'),
						{
							loader: 'sass-loader',
							options: {
								includePaths: [resolve('src', 'styles'), srcDir],
							},
						},
					],
				},
				{
					test: /\.(json|png|jpg|gif)$/,
					include: /src/,
					use: relativeFileLoader(),
				},
				{
					test: /\.(wxml)$/,
					include: /src/,
					use: [
						relativeFileLoader('wxml'),
						{
							loader: 'wxml-loader',
							options: {
								root: srcDir,
								enforceRelativePath: true,
							},
						},
					],
				},
			],
		},
		plugins: [
			new EnvironmentPlugin({
				NODE_ENV: 'development',
			}),
			new DefinePlugin({
				__DEV__: isDev,
			}),
			new WXAppWebpackPlugin({
				clear: !isDev,
			}),
			new optimize.ModuleConcatenationPlugin(),
			new IgnorePlugin(/vertx/),
			shouldLint && new StylelintPlugin(),
			min && new MinifyPlugin(),
			new CopyPlugin(copyPatterns, { context: srcDir }),
		].filter(Boolean),
		devtool: isDev ? 'inline-source-map' : false,
		resolve: {
			modules: [resolve(__dirname, 'src'), 'node_modules'],
		},
		watchOptions: {
			ignored: /dist|manifest/,
			aggregateTimeout: 300,
		},
	};
};
