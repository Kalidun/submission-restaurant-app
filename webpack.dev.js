const { merge } = require("webpack-merge")
const path = require("path")
const common = require("./webpack.common")

module.exports = merge(common, {
	mode: "development",
	devtool: "inline-source-map",
	devServer: {
		static: path.resolve(__dirname, "dist"),
		devMiddleware: {
			writeToDisk: true,
		},
		open: true,
		compress: true,
		hot: true,
		liveReload: true,
		client: {
			overlay: {
				errors: true,
				warnings: false,
			},
		},
		onBeforeSetupMiddleware: (server) => {
			server.app.get(/\.hot-update\.json$/, (req, res) => {
				res.status(204).send() 
			})
		},
	},
})
