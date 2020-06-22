const path = require('path')
const build = require('../../../webpack')

module.exports = build([
  ['index', path.resolve(__dirname, 'index.ts')],
])
