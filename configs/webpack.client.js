var webpack = require("webpack");
var path = require("path");
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const extractCSS = new ExtractTextPlugin('client.css');

module.exports = {
	target:  "web",
	cache:   false,
	context: __dirname,
	debug:   false,
	devtool: false,
	entry:   ["../app/App.js"],
	output:  {
		path:          path.join(__dirname, "../static/dist"),
		filename:      "client.js",
		chunkFilename: "[name].[id].js"
	},
	plugins: [
		new webpack.DefinePlugin({__CLIENT__: true, __SERVER__: false, __PRODUCTION__: true, __DEV__: false}),
		new webpack.DefinePlugin({"process.env": {NODE_ENV: '"production"'}}),
		new webpack.optimize.DedupePlugin(),
		new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.optimize.UglifyJsPlugin({compress: {warnings: false}}),
    extractCSS
	],
	module:  {
		loaders: [
      {test: /\.scss$/i, loader: extractCSS.extract(['css','sass'])},
			{test: /\.json$/, loaders: ["json"]},
      {test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/font-woff"},
            {test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/font-woff"},
            {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/octet-stream"},
            {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file"},
            {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=image/svg+xml"}
		],
		postLoaders: [
			{test: /\.js$/, loaders: ["babel?presets[]=es2015&presets[]=stage-0&presets[]=react"], exclude: /node_modules/}
		],
		noParse: /\.min\.js/
	},

	node:    {
		__dirname: true,
		fs:        'empty'
	}
};
