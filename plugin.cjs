const liblucyPromise = import('@lucy/liblucy');
const { readFile } = require('fs').promises;

module.exports = function (_, pluginOptions = {}) {
  return {
    name: '@lucy/snowpack-plugin',
    resolve: {
      input: ['.lucy'],
      output: ['.js'],
    },
    async load({ filePath }) {
      const { compileXstate, ready } = await liblucyPromise;
      const [contents] = await Promise.all([
        readFile(filePath, 'utf-8'),
        ready
      ]);
      
      const js = compileXstate(contents, filePath, pluginOptions);

      return {
        '.js': js
      };
    },
  };
};