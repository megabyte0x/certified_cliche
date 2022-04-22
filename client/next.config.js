module.exports = (phase, { defaultConfig }) => {
  return {
    ...defaultConfig,

    webpack: (config) => {
      config.resolve = {
        ...config.resolve,
        fallback: {
          "fs": false,
          "path": false,
          "crypto": false,
          "assert": require.resolve('assert'),
          "crypto": require.resolve('crypto-browserify'),
          "http": require.resolve('stream-http'),
          "https": require.resolve('https-browserify'),
          "os": require.resolve('os-browserify/browser'),
          "stream": require.resolve('stream-browserify'),
        }
      }
      return config
    },
  }
}