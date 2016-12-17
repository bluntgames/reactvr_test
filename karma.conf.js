var webpack = require('webpack');

module.exports = function (config) {
  config.set({

    browsers: [
      //    process.env.CONTINUOUS_INTEGRATION ? 'Firefox' : 'Chrome'
        //'Chrome'
      'PhantomJS'
    ],

    singleRun: true,

    // Configure code coverage reporter
    coverageReporter: {
      dir: 'coverage/',
      reporters: [
        {type: 'text-summary'},
        {type: 'html'}
      ]
    },

    frameworks: [
      'mocha'
    ],

    files: [
      'src/tests.webpack.js'
    ],

    preprocessors: {
      'src/tests.webpack.js': [ 'webpack', 'sourcemap' ]
    },

    reporters: [ 'progress', 'coverage' ],

    webpack: require('./webpack.config'),

    webpackServer: {
      noInfo: true
    }

  });
};