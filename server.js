const browserSync = require('browser-sync');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const historyApiFallback = require('connect-history-api-fallback');
// const WebpackDevServer = require('webpack-dev-server');
const webpackConfig = require('./webpack.config');

const compiler = webpack(webpackConfig);
const port = 9100;

// We give notice in the terminal when it starts bundling.
compiler.plugin('compile', () => {
  console.log('Bundling...');
});

// We also give notice when it is done compiling, including the time it took.
compiler.plugin('done', (stats) => {
  console.log(`Bundled in ${stats.endTime - stats.startTime}ms!`);
});

// const bundler = new WebpackDevServer(compiler, {
//   publicPath: webpackConfig.output.publicPath,
//   hot: true,
//   noInfo: true,
//   historyApiFallback: true,
// });

// bundler.listen(port, 'localhost', (err) => {
//   if (err) {
//     console.log(err);
//     return;
//   }

//   console.log(`Listening at http://localhost:${port}/`);
// });

/**
 * Run Browsersync and use middleware for Hot Module Replacement
 */
browserSync({
  port,
  ui: { port: port + 1 },
  // proxy: {
    // target: 'http://localhost:' + port,
  server: {
    baseDir: '.',
    routes: {
      '/': 'index.html',
    },
    middleware: [
      // hygienistMiddleware('assets/dist'),
      historyApiFallback(),

      webpackDevMiddleware(compiler, {
        // IMPORTANT: dev middleware can't access config, so we should
        // provide publicPath by ourselves
        publicPath: webpackConfig.output.publicPath,

        // pretty colored output
        stats: webpackConfig.stats,

        // for other settings see
        // http://webpack.github.io/docs/webpack-dev-middleware.html
      }),

      // bundler should be the same as above
      webpackHotMiddleware(compiler),
    ],
  },

  // no need to watch '*.js' here, webpack will take care of it for us,
  // including full page reloads if HMR won't work
  files: [
    './src/**/*.css',
    '*.html',
  ],
});
