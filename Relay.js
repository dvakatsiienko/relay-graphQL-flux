const transpileRelay = require('babel-relay-plugin');
const schema = require('./graphs/schema.json').data;

module.exports = transpileRelay(schema);