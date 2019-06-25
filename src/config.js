const config = {
  base: {
    publicPath: '',
  },
  development: {
  },
  stage: {
  },
  production: {
  },
};
module.exports =
  Object.assign(
    {},
    config.base,
    config[process.env.APP_ENV || process.env.NODE_ENV],
  );
