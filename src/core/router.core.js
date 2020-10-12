const Router = require('koa-router');
const glob = require('glob');
const path = require('path');

module.exports = (app) => {
  const router = new Router();

  // eslint-disable-next-line no-console
  console.info('Creating routes...');
  glob(path.join(__dirname, '../api/*.api.js'), (err, files) => {
    if (err) throw err;

    files.forEach((file) => {
      // eslint-disable-next-line no-console
      console.info(`Adding routes ${file}`);
      // eslint-disable-next-line import/no-dynamic-require, global-require
      const routes = require(file);
      if (routes instanceof Router) {
        router.use(routes.routes(), routes.allowedMethods());
      }
    });

    // eslint-disable-next-line no-console
    console.info('Routes created.');
    app.use(router.routes()).use(router.allowedMethods({ throw: true }));
  });
};
