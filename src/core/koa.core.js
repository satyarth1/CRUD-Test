const stream = require('stream');

const Koa = require('koa');
const logger = require('koa-logger');
const httpErrors = require('http-errors');
const mongoose = require('mongoose');

const cors = require('./cors.core');
const log = require('../lib/log.lib');
require('./mongo-db.core');

// create applciation
const app = new Koa({
  proxy: true,
});

// attach logger
app.use(logger());
app.use(cors());

// error handler
app.use(async (ctx, next) => {
  ctx.id = mongoose.Types.ObjectId();
  ctx.set('X-REQUEST-ID', `req_${ctx.id}`);
  ctx.PER_PAGE = 20;
  // console.log(ctx.request.hostname);
  try {
    await next();
    if (ctx.body instanceof stream.Readable) {
      return;
    }

    if (!ctx.body && ctx.status > 299) {
      throw httpErrors(ctx.status);
    }
  } catch (e) {
    // eslint-disable-next-line no-console
    log.error(e);

    ctx.status = e.status || e.statusCode || 500;

    const response = {
      message: e.message || 'Internal server error.',
    };

    if (e.flag) {
      response.flag = e.flag;
    }

    if (e.token) {
      response.token = e.token;
    }

    if (process.env.DEBUG === 'false' && ctx.status >= 500) {
      response.message = 'Internal server error.';
    }

    ctx.body = e.body || response;

    if (ctx.status >= 500) {
      app.emit('error', e, ctx);
    }
  }
});

module.exports = { app };
