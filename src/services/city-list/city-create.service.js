const { City } = require('./city-deps.service').models;

async function cityCreate({ attrs }) {
  const cityName = new City(attrs);
  await cityName.save();

  return cityName;
}

module.exports = {
  cityCreate,
};
