const BabelRelayPlugin = require('babel-plugin-relay');

try {
  const schema = require('../schema.json');
  module.exports = BabelRelayPlugin(schema.data);
} catch (exception) {
  console.log('relay plugin get schema.json failed, ignore it when running scripts');
}
