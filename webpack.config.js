var path = require('path')
module.exports = {
    context: path.join(__dirname, "src"),
    entry: {
        javascript: "./main.js"
    },

    output: {
        filename: "app.js",
        path: path.join(__dirname, "public"),
    },

    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loaders: ["babel-loader"]
            }
        ]
    }
};
