const path = require('path');
const webpack = require('webpack');
// const NpmInstallPlugin = require('npm-install-webpack-plugin');

const DEBUG = process.env.NODE_ENV !== 'production' && !~process.argv.indexOf('-p');
const VERBOSE = !!~process.argv.indexOf('verbose');
const hotEntry = DEBUG ? [
  'react-hot-loader/patch',
  'webpack-hot-middleware/client',
  // 'webpack-dev-server/client?http://localhost:9100/',
  // 'webpack/hot/only-dev-server',
] : [];

// console.log(DEBUG, process.env.NODE_ENV);

module.exports = {
  debug: DEBUG,
  stats: {
    colors: true,
    reasons: DEBUG,
    hash: VERBOSE,
    version: VERBOSE,
    timings: true,
    chunks: VERBOSE,
    chunkModules: VERBOSE,
    cached: VERBOSE,
    cachedAssets: VERBOSE,
  },
  // devtool: 'eval',
  // devtool: 'cheap-module-source-map',
  devtool: DEBUG ? 'cheap-module-eval-source-map' : false,
  target: 'web',
  resolve: {
    // you can now require('file') instead of require('file.js')
    extensions: ['', '.js', '.jsx', '.json'],
    root: [path.resolve(path.join(__dirname, './src'))],
  },
  entry: {
    main: [
      ...hotEntry,
      './src/index',
    ],
    vendor: [
      // ...hotEntry,
      'react',
      'react-dom',
    ],
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].bundle.js',
    chunkFilename: `[id].${DEBUG ? '' : '[chunkhash].'}chunk.js`,
    publicPath: '/dist/',
  },
  plugins: [
    // new webpack.DefinePlugin({ 'process.env.NODE_ENV': JSON.stringify('production') }),
    new webpack.DefinePlugin({ 'process.env.NODE_ENV': JSON.stringify(DEBUG ? 'development' : 'production') }),
    new webpack.optimize.CommonsChunkPlugin(/* chunkName= */'vendor', /* filename= */'vendor.bundle.js'), // ,Infinity),
    ...(DEBUG ? [
      // new NpmInstallPlugin(),
      new webpack.optimize.OccurenceOrderPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin(),
    ] : [
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.OccurenceOrderPlugin(),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          dead_code: true,
          drop_console: true,
          screw_ie8: true,
          warnings: false,
        },
      }),
    ]),
  ],
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['babel'],
      include: path.join(__dirname, 'src'),
      exclude: /node_modules/,
    }],
  },
};
