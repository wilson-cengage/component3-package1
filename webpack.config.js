const webpack = require('webpack');
const path = require('path');

const nodeEnv = process.env.NODE_ENV || 'development';
const isProd = nodeEnv === 'production';

const packageName = 'component3-package1';

module.exports = {
  devtool: isProd ? 'hidden-source-map' : 'cheap-eval-source-map',
  context: path.join(__dirname, './client'),
  entry: {
    'index': './index.js',
    [`${packageName}/${packageName}`]: './exports.js'
  },
  output: {
    path: path.join(__dirname, './static/'),
    publicPath: '/components/',   /* for bundle chunk lookup during runtime, should eventually be CMP /components/component3-package1/ */
    filename: '[name].js',
    chunkFilename: `${packageName}/${packageName}-[id].js`,
    libraryTarget: 'umd'
  },
  externals: {
    'react': 'React',
    'react-dom': 'ReactDOM'
  },
  module: {
    loaders: [
      {
        test: /\.html$/,
        loader: 'file',
        query: {
          name: '[name].[ext]'
        }
      },
      {
        test: /\.css$/,
        loaders: [
          'style',
          'css'
        ]
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loaders: [
          // 'react-hot',
          'babel-loader'
        ]
      },
      {
        test: /\.(png|jpg)$/,
        loader: 'url-loader',  // inline base64 URLs for <=8k images, direct URLs for the rest
        query: {
          limit: 8192
        }
      }
    ],
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
    modules: [
      path.resolve('./client'),
      'node_modules'
    ]
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      output: {
        comments: false
      },
      sourceMap: false
    }),
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify(nodeEnv) }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      children: true,     /** deps shared by chunks are extracted into its own async chunk **/
      async: true
    })
  ],
  devServer: {
    contentBase: './client'
    // hot: true
  }
};