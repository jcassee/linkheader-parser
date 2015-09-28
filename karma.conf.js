module.exports = function (config) {
  config.set({

    files: [
      'dist/linkheader-parser-browser.js',
      'src/linkheader-parser.spec.js'
    ],

    autoWatch: true,

    frameworks: ['jasmine'],

    browsers: ['PhantomJS'],

    reporters: ['progress']
  });
};
