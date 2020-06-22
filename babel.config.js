const path = require('path')
const { readdirSync } = require('fs')

const presets = [
  ["@babel/preset-env", {
    "targets": {
      "node": "12"
    }
  }],
  ["@babel/preset-typescript", {
    onlyRemoveTypeImports: true,
  }],
]

const buildAliases = () => readdirSync(path.resolve(__dirname, 'src'), { withFileTypes: true })
  .filter(dir => dir.isDirectory())
  .reduce((aliases, dir) => ({
    ...aliases,
    [dir.name]: `./src/${dir.name}`,
  }), {})

const plugins = [
  ["module-resolver", {
    "root": ["./src/*"],
    alias: buildAliases(),
  }],
  ['@babel/plugin-proposal-decorators', {
    legacy: true,
  }],
  ['@babel/plugin-proposal-class-properties', {
    loose: true,
  }],
  'babel-plugin-transform-typescript-metadata',
]

module.exports = {
  presets,
  plugins,
}
