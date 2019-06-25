const { VueLoaderPlugin } = require('vue-loader');
const rootWebpackConfig = require('../webpack/webpack.client');
const remove = require('lodash/remove');

module.exports = (storybookBaseConfig) => {
  storybookBaseConfig.resolve.alias = {
    ...storybookBaseConfig.resolve.alias,
    ...rootWebpackConfig.resolve.alias,
  };

  const { rules } = storybookBaseConfig.module;


  // const ruleVue = rules.find(rule => rule.test.test('.vue'));
  remove(rules, rule => rule.test.test('.vue'));

  storybookBaseConfig.module.rules = [
    ...rules,
    ...rootWebpackConfig.module.rules,
  ];


  storybookBaseConfig.plugins.push(new VueLoaderPlugin());

  rootWebpackConfig.resolve.modules.forEach((modulePath) => {
    if (modulePath.indexOf('node_modules') === -1) {
      storybookBaseConfig.resolve.modules.push(modulePath);
    }
  });

  return storybookBaseConfig;
};
