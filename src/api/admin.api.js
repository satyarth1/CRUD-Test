const Router = require('koa-router');

const cityService = require('../services/city-list/city.service');

const route = new Router({
  prefix: '/admin',
});

// url: POST: /city
route.post('/city', async (ctx) => {
  const city = await cityService.create.cityCreate({ attrs: ctx.request.body });

  const message = 'city created successfully.';

  ctx.reply({ city }, { message });
});

// list citys
// url: GET: /city
route.get('/city', async (ctx) => {
  const city = await cityService.get.getAll();

  const message = 'Registered city list.';

  ctx.reply({ city }, { message });
});
// get city by id
// url: GET: /city/:id
route.get('/city/:id', async (ctx) => {
  const city = await cityService.get.getById(ctx.params.id);

  const message = 'Registered city ';

  ctx.reply({ city }, { message });
});

// update city by id
// url: PUT: /city/:id
route.put('/city/:id', async (ctx) => {
  const city = await cityService.update.updateById(ctx.params.id, { attres: ctx.request.body });

  const message = 'city updated';

  ctx.reply({ city }, { message });
});

// url: DELETE: /city/:id
route.delete('/city/:id', async (ctx) => {
  const city = await cityService.delete.deleteById(ctx.params.id);

  const message = 'city deleted';

  ctx.reply({ city }, { message });
});

module.exports = route;
