
var path = require('path'),
	webpack = require('webpack'),
	webpackStream = require('webpack-stream'),
	UglifyJsPlugin = require('uglifyjs-webpack-plugin'),
	gulp = require('gulp'),
	MiniCssExtractPlugin = require("mini-css-extract-plugin"),
	WebpackDevServer = require('webpack-dev-server'),
	HtmlWebpackPlugin = require('html-webpack-plugin');


const PORT_HOT = process.env.NODE_PORT_HOT || 9000
	, PORT = process.env.NODE_PORT || 3000

class Gulp {

	dir () {

		return path.resolve(__dirname, './')
	}

	isLocal () {

		return process.env.NODE_ENV === 'local'
	}

	definePlugins () {

		const plugins = [
			new MiniCssExtractPlugin("css/[name].css"),
			new HtmlWebpackPlugin({
				filename: this.isLocal() ? 'index.html' : '../../views/index.html',
				template: path.resolve(__dirname, `template/index.html`)
			})
		]

		if (this.isLocal()) {

			plugins.push(
				new webpack.NamedModulesPlugin(),
				new webpack.HotModuleReplacementPlugin(),
			)
		}

		const generatePluginsPath = () => {

			const list = {
				helper: path.resolve(__dirname, 'plugins/helper'),
				logger: path.resolve(__dirname, 'plugins/logger'),
				validator: path.resolve(__dirname, 'plugins/validator'),
				lang: path.resolve(__dirname, 'lang'),
				names: path.resolve(__dirname, 'share/names'),
				apis: path.resolve(__dirname, 'share/apis'),
				img: path.resolve(__dirname, './assets/img'),
				routes: path.resolve(__dirname, 'share/routes'),
				query: path.resolve(__dirname, 'share/query'),
				mutation: path.resolve(__dirname, 'share/mutation'),
			}

			for (let key in list) {
				list[key] = [list[key], 'default']
			}

			return list
		}

		plugins.push(new webpack.ProvidePlugin({
			React: 'react',
			ReactDOM: 'react-dom',
			im: 'immutable',
			$: 'jquery',
			jQuery: 'jquery',
			...generatePluginsPath()
		}))

		return plugins
	}

	defineAlias () {

		const alias = {
			style: path.resolve(__dirname, './assets/sass'),
			pages: path.resolve(__dirname, './pages'),
			config:  path.resolve(__dirname,`./config/${process.env.NODE_ENV !='local' ? process.env.NODE_ENV : ''}` ),
			components: path.resolve(__dirname, './components'),
			ui: path.resolve(__dirname, './components/ui'),
			hoc: path.resolve(__dirname, './components/hoc'),
			layout: path.resolve(__dirname, './components/layout')
		}

		return alias
	}

	getEntries () {

		if (this.isLocal())
			return [
				'webpack-dev-server/client?http://localhost:' + PORT_HOT,
				'webpack/hot/only-dev-server',
				'react-hot-loader/patch',
				this.dir() + '/index.jsx',
			]

		return [
			this.dir() + '/index.jsx',
		]
	}

	root () {

		return process.cwd()
	}

	webpackConfig () {

		return {

			mode: !this.isLocal() ? 'production' : 'development',
			entry: this.getEntries(),
			watch: this.watch,
			output: {
				path: path.resolve(this.root(), 'public/assets'),
				publicPath: '/assets/',
				chunkFilename: 'app/[name].[hash].bundle.js',
				filename:  'app/[name].[hash].js'
			},
			module: {

				rules: [
					{
						test: /\.mjs$/,
						include: /node_modules/,
						type: "javascript/auto",
					},
					{
						test: /\.jsx?$/,
						exclude: /node_modules/,
						loader: 'babel-loader'
					},
					{
						test: /\.(woff2?|ttf|otf|eot|svg)$/,
						exclude: /node_modules/,
						loader: 'file-loader',
						options: {
							name: '[name].[ext]',
							outputPath: "fonts",
							publicPath: '/assets/fonts',
						}
					},
					{
						test: /\.(png|jpg|gif)$/,
						exclude: /node_modules/,
						loader: 'file-loader',
						options: {
							name: '[name].[ext]',
							outputPath: "img",
							publicPath: '/assets/img',
						}
					},
					{
						test: /\.(sa|sc|c)ss$/,
						use: [
							 MiniCssExtractPlugin.loader,
							'css-loader',
							'sass-loader',
						]
					}
				]
			},

			resolve: {

				extensions: ['.js', '.jsx', '.scss'],
				alias: this.defineAlias()
			},

			plugins: this.definePlugins(),

			optimization: {
				runtimeChunk: 'single',
				removeAvailableModules: false,
				splitChunks: {chunks: 'all'},
				minimizer: [
					new UglifyJsPlugin()
				],
				removeEmptyChunks: true
			}
		}
	}

	webpack () {

		gulp.src(this.dir() + '/app.jsx')
			.pipe(webpackStream(this.webpackConfig()))
			.on('error', function handleError(err) {
				console.log(err)
			})
			.pipe(gulp.dest(this.root() + '/public/assets'))
	}

	webpackDevServer () {

		// Start a webpack-dev-server
		new WebpackDevServer(webpack(this.webpackConfig()), {
			stats: {
				colors: true
			},
			proxy: [{
				context: [
					'/upload',
					'/api/v1',
					'/assets/js',
					'/logout'
				],
				target: 'http://localhost:' + PORT,
				secure: false,
				changeOrigin: true
			}],
			compress: true,
			hot: true,
			publicPath: '/assets',
			inline:  true,
			historyApiFallback: {
				rewrites: [
					{ from: /(.*)[^(api)]/, to: '/assets/index.html' },
				]
			},
			watchContentBase: true,
		}).listen(PORT_HOT, function (err) {

			console.log('webpack dev server port: ', PORT_HOT)

			if (err) console.log(err)
		});
	}

	run () {


		if (this.isLocal())
			this.webpackDevServer()
		else
			this.webpack()
	}

}

module.exports = new Gulp
