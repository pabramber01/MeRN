import p from 'path';
import fs from 'fs/promises';

const readFixtures = async (params) => {
  const assets = [];
  const data = [];
  const dirs = await searchDirs(params);

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

const moveAssets = async (params) => {
  const { mainPath } = params;

  await deleteDirs({ mainPath });
  await moveDirs(params);
};

const moveDirs = async (params) => {
  const { mainPath, assets } = params;

  for (const path of assets) {
    const basename = p.basename(path);
    await fs.cp(path, p.join(mainPath, basename), {
      recursive: true,
      force: true,
    });
  }
};

const deleteDirs = async (params) => {
  params = params || {};

  let { mainPath } = params;
  mainPath = mainPath || './public';

  const paths = await fs.readdir(mainPath);

  for (const path of paths) {
    await fs.rm(p.join(mainPath, path), { recursive: true, force: true });
  }
};

const searchDirs = async (params) => {
  params = params || {};

  let { mainPath, regex } = params;
  mainPath = mainPath || '.';

  return await searchDirsImpl(mainPath, [], new RegExp(regex));
};

const searchDirsImpl = async (mainPath, files, regex) => {
  const paths = await fs.readdir(mainPath);

  for (const file of paths) {
    const path = p.join(mainPath, file);
    const isDir = (await fs.stat(path)).isDirectory();
    if (isDir) {
      if (regex.test(path)) files.push(path);
      else await searchDirsImpl(path, files, regex);
    }
  }

  return files;
};

export { readFixtures, moveAssets };
