const path = require('path');
const fs = require('fs-extra');

fs.mkdirpSync(path.resolve(process.cwd(), 'storage/logs'));

const envFile = path.join(process.cwd(), '.env');
const exampleEnvFile = path.join(process.cwd(), '.env.example');

fs.copyFileSync(exampleEnvFile, envFile, fs.constants.COPYFILE_EXCL);

require('dotenv').config();
require('../core/mongo-db.core');

const City = require('../models/city.model');

async function seedUsers() {
  try {
    await City.create({
      cityName: 'Delhi',
    });
  } catch (e) {
    // ignore
  }
}

Promise.all([
  seedUsers(),
])
  .then(() => {
    // eslint-disable-next-line no-console
    console.log('Project setup successfully.');
    process.exit(0);
  })
  .catch((e) => {
    // eslint-disable-next-line no-console
    console.error(e);
    // eslint-disable-next-line no-console
    console.log('Project setup failed.');
  });
