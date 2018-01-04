let WriteFilePlugin = require('write-file-webpack-plugin')

module.exports = {
    entry: "./app/index.js",
    output: {
        path: __dirname,
        filename: "./dist/app.js"
    },
    plugins: [
        new WriteFilePlugin()
    ],
    module: {
        rules: [
            {
                test: /\.jsx?$/,  
                include: __dirname,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [ 
                            [
                                'env', 
                                {
                                    modules: "commonjs"
                                }
                            ],
                            'react'
                        ]
                    }
                }
            },
            {
                test: /\.scss$/,
                use: [{
                    loader: "style-loader"
                }, {
                    loader: "css-loader"
                }, {
                    loader: "sass-loader",
                    options: {
                     includePaths: ["./src/sass/main.scss"]
                }
            }]
            }
        ]
    }
}
};
