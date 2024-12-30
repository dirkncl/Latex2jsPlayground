import packages from './d3/package.json' with {type: 'json'}
const { version } = packages
export { version }
export * from './d3/src/index.js'