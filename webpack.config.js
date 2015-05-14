module.exports = {
    entry: "./src/entry.js",
    output: {
        path: __dirname,
        filename: "bundle.js"
    },
    module: {
        loaders: [
            { test: /\.js$/, exclude: /node_modules|3rd_party/, loader: "babel-loader?optional=runtime" }
        ]
    },
    devtool: 'source-map'
}
