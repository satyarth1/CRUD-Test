const bodyParser = require('koa-body');
const queIt = require('que-it');
const { RateLimit } = require('koa2-ratelimit');

const { app } = require('./koa.core');
const router = require('./router.core');

queIt.config.set('driver', process.env.QUEUE_DRIVERS || 'sync');

// global rate limiter
const limiter = RateLimit.middleware({
  interval: { min: 1 },
  max: 120, // limit each IP requests per interval
});


app.context.reply = function respond(data, { meta, message } = {}) {
  this.body = { data, message, meta };
};

app.use(bodyParser({
  multipart: true,
}));

// registered last then should be called first
app.use(limiter);

router(app);

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || '127.0.0.1';

app.listen(PORT, HOST, () => {
  // eslint-disable-next-line no-console
  console.info(`Server will listen to port ${PORT}`);
});
