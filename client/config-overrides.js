const { override, fixBabelImports, addLessLoader } = require('customize-cra');

module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true,
  }),
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: {
      '@primary-color': '#E8505B',
      '@btn-border-radius-base': '5px',
      '@btn-primary-shadow': '0 1px 8px #142E6E1A',
      '@btn-font-weight': '400',
      '@font-family': 'Open Sans',
      '@btn-height-base': '58px',
      '@font-size-base': '18px',
    },
  })
);
