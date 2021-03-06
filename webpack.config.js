const path = require('path');
const webpack = require('webpack');

const argv = require('yargs').argv;
const devMode = argv.mode !== 'production';

const appPath = path.join(__dirname, '');
const jsPath = path.join(appPath, '/src/');
const outPath = path.join(appPath, '/dist/');

const rules = [{
		test: /\.js$/,
		exclude: /(node_modules|bower_components)/,
		use: 'babel-loader',
	},
];

const plugins = [];

module.exports = {
	devtool: devMode? 'inline-module-source-map' : false,
	context: appPath,
	entry: {
		"wait-for-media-files": [
			jsPath + 'global.js',
		],
		"jquery": [
			jsPath + 'jquery.js',
		],
		"../test/dist/globalPromise": [
			jsPath + '/../test/src/globalPromise.js',
		],
		"../test/dist/jqueryPromise": [
			jsPath + 'jqueryPromise.js',
		],
	},
	resolve: {
		modules: [path.resolve(__dirname), 'node_modules']
	},
	output: {
		path: outPath,
		publicPath: '/',
		filename: '[name].min.js'
	},
	module: {
		rules: rules
	},
	plugins: plugins,
	watch: true,
	externals: {
	},
	stats: { //console info
		entrypoints: false,
		children: false
	},
};