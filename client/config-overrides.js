const { override, addBabelPlugin } = require('customize-cra');

module.exports = override(
  addBabelPlugin([
    'babel-plugin-root-import',
    {
      paths: [
        {
          rootPathSuffix: 'src',
        },
        {
          rootPathPrefix: '#components/',
          rootPathSuffix: 'src/components/',
        },
      ],
    },
  ])
);
