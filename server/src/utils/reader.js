import p from 'path';
import fs from 'fs/promises';

const readJSONFiles = async (params) => {
  const data = [];
  const paths = await searchFiles(params);

  for (const path of paths) {
    data.push(JSON.parse(await fs.readFile(path)));
  }

  return data;
};

const searchFiles = async (params) => {
  params = params || {};

  let { mainPath, regex } = params;
  mainPath = mainPath || '.';

  return await searchFilesImpl(mainPath, [], regex);
};

const searchFilesImpl = async (mainPath, files, regex) => {
  const paths = await fs.readdir(mainPath);

  for (const file of paths) {
    const path = p.join(mainPath, file);
    const isDir = (await fs.stat(path)).isDirectory();
    if (isDir) {
      await searchFilesImpl(path, files, regex);
    } else {
      const rgx = new RegExp(regex);
      if (rgx.test(path)) files.push(path);
    }
  }

  return files;
};

export { readJSONFiles };
