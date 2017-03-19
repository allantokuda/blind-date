module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    plugins: [
      'karma-jasmine',
      'karma-firefox-launcher'
    ],
    files: [
      'src/*.js'
    ],
    browsers: ['Firefox'],
  })
}
