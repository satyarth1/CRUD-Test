const { City } = require('./city-deps.service').models;
const { createError } = require('./city-deps.service').libs;

async function getAll() {
  const city = await City.find();

  if (!city) {
    throw createError('No city found');
  }

  return city;
}

async function getById(cityId) {
  const condition = { _id: cityId };

  const city = await City.findOne(condition);

  if (!city) {
    throw createError('No city  found');
  }

  return city;
}

module.exports = {
  getAll,
  getById,
};
