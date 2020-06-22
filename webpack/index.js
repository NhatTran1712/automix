const merge = require('webpack-merge')

const base = process.env.NODE_ENV === 'production'
  ? require('./webpack.config.prod')
  : require('./webpack.config.dev')

module.exports = (functions) => merge(base, {
  entry: functions.reduce((carry, [name, path]) => ({
    ...carry,
    [name]: path,
  }), {}),
})
