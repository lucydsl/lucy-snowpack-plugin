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
      const { compileXstate } = await liblucyPromise;
      const contents = await readFile(filePath, 'utf-8');
      
      const js = compileXstate(contents, filePath, pluginOptions);

      return {
        '.js': js
      };
    },
  };
};