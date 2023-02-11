import mongoose from 'mongoose';
import { readJSONFiles } from './index.js';
import '../app.js';

const populate = async () => {
  console.log('Dumping data...');

  const data = await readJSONFiles({
    mainPath: './src',
    regex: '^.*Fixture.json$',
  });

  for (const json of data) {
    await mongoose.model(json.model).deleteMany({});
    await mongoose.model(json.model).insertMany(json.data);
  }

  console.log('Dumping was successful!');
  await mongoose.connection.close();
  console.log('Connection closed.\n');
  process.exit();
};

populate();
