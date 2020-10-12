const { City } = require('./city-deps.service').models;
const { createError } = require('./city-deps.service').libs;

async function updateById(id, { attres }) {
  const condition1 = { _id: id };

  const condition = { $set: attres };

  const city = await City.update(condition1, condition);

  if (city.nModified === 0) {
    throw createError('No city found');
  }

  return city;
}


module.exports = {
  updateById,
};
