import mongoose from 'mongoose';
import { moveAssets, readFixtures } from './index.js';
import '../app.js';

const populate = async () => {
  console.log('Dumping data...');

  const { assets, data } = await readFixtures({
    mainPath: './src',
    regex: '^.*Fixture$',
  });

  for (const json of data) {
    await mongoose.model(json.model).deleteMany({});
    await mongoose.model(json.model).insertMany(json.data);
  }

  await moveAssets({
    mainPath: './public/mern',
    assets,
  });

  console.log('Dumping was successful!');
  await mongoose.connection.close();
  console.log('Connection closed.\n');
  process.exit();
};

populate();
