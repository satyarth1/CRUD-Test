const { City } = require('./city-deps.service').models;
const { createError } = require('./city-deps.service').libs;

async function deleteById(id) {
  const condition1 = { _id: id };
  const city = await City.remove(condition1);
  if (city.deletedCount === 0) {
    throw createError('No city Register');
  }
  return city;
}

module.exports = {
  deleteById,
};
