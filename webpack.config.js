const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

module.exports = {
    entry: './src/main.js',
    output: {
        path: path.join(__dirname, '/dist'),
        filename: 'main.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['cache-loader', 'babel-loader']
            },
            {
                test: /\.scss$/i,
                use: [
                    'style-loader',
                    'cache-loader',
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'cache-loader', 'css-loader']
            },
            {
                test: /\.svg$/i,
                use: [
                    '@svgr/webpack',
                    {
                        loader: 'file-loader',
                        options: {
                            name(resourcePath, resourceQuery) {
                                if (/fonts/.test(resourcePath)) {
                                    return `fonts/[name].[ext]?[hash]`;
                                }
                                return 'images/[name].[ext]?[hash]';
                            }
                        }
                    }
                ]
            },
            {
                test: /\.(png|jpe?g|gif)$/,
                loader: 'file-loader',
                options: {
                    name: 'images/[name].[ext]?[hash]'
                }
            }
        ]
    },
    devtool: 'eval-cheap-module-source-map'
};

if (process.env.NODE_ENV === 'production') {
    module.exports.plugins = (module.exports.plugins || []).concat([
        // new BundleAnalyzerPlugin(),
        new CleanWebpackPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        })
    ]);
}
