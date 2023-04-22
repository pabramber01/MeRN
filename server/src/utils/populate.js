import { v2 as cloudinary } from 'cloudinary';
import p from 'path';
import fs from 'fs/promises';
import mongoose from 'mongoose';
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

  await replaceAssets({
    mainPath: process.env.NODE_ENV !== 'production' ? './public/mern' : 'mern/',
    mantainDir: true,
    assets,
  });

  console.log('Dumping was successful!');
  await mongoose.connection.close();
  console.log('Connection closed.\n');
  process.exit();
};

const readFixtures = async (params) => {
  const assets = [];
  const data = [];
  const dirs = await searchFiles(params);

  for (const dir of dirs) {
    const files = await fs.readdir(dir);
    for (const file of files) {
      const path = p.join(dir, file);
      const isDir = (await fs.stat(path)).isDirectory();
      if (isDir) assets.push(path);
      else data.push(JSON.parse(await fs.readFile(path)));
    }
  }

  return { assets, data };
};

const replaceAssets = async (params) => {
  const { mainPath } = params;

  if (process.env.NODE_ENV !== 'production') {
    await deleteDirsContentLocal({ mainPath });
    await copyDirsLocal(params);
  } else {
    await deleteDirsContentCloud({ mainPath });
    await copyDirsCloud(params);
  }
};

const deleteDirsContentLocal = async (params) => {
  params = params || {};

  let { mainPath } = params;
  mainPath = mainPath || './public';

  try {
    await fs.stat(mainPath);
  } catch (e) {
    await fs.mkdir(mainPath);
  }

  const paths = await fs.readdir(mainPath);

  for (const path of paths) {
    await fs.rm(p.join(mainPath, path), { recursive: true, force: true });
  }
};

const copyDirsLocal = async (params) => {
  const { mainPath, assets } = params;

  for (const path of assets) {
    const basename = p.basename(path);
    await fs.cp(path, p.join(mainPath, basename), {
      recursive: true,
      force: true,
    });
  }
};

const deleteDirsContentCloud = async (params) => {
  params = params || {};

  let { mainPath } = params;
  mainPath = mainPath || 'mern/';

  await cloudinary.api.delete_resources_by_prefix(mainPath, {
    type: 'authenticated',
  });

  let paths;
  try {
    paths = (await cloudinary.api.sub_folders(mainPath)).folders.map(
      (subfolder) => subfolder.path
    );
  } catch (e) {
    return;
  }

  for (let i = 0; i < paths.length; i++) {
    await cloudinary.api.delete_folder(paths[i]);
  }
};

const copyDirsCloud = async (params) => {
  const { mainPath, assets } = params;

  for (const path of assets) {
    const files = await searchFiles({
      mainPath: path,
      regex: /[^\s]+(.*?).(jpg|jpeg|png|gif|JPG|JPEG|PNG|GIF)$/,
    });

    for (const file of files) {
      const extraPath = file.split(p.basename(path))[1].replaceAll(/\\/g, '/');
      const i = extraPath.lastIndexOf('/');

      await cloudinary.uploader.upload(file, {
        type: 'authenticated',
        use_filename: true,
        unique_filename: false,
        folder: mainPath + p.basename(path) + extraPath.substr(0, i),
        resource_type: 'auto',
      });
    }
  }
};

const searchFiles = async (params) => {
  params = params || {};

  let { mainPath, regex } = params;
  mainPath = mainPath || '.';

  return await searchFilesImpl(mainPath, [], new RegExp(regex));
};

const searchFilesImpl = async (mainPath, files, regex) => {
  const paths = await fs.readdir(mainPath);

  for (const file of paths) {
    const path = p.join(mainPath, file);
    const isDir = (await fs.stat(path)).isDirectory();
    if (regex.test(path)) files.push(path);
    if (isDir) await searchFilesImpl(path, files, regex);
  }

  return files;
};

populate();
