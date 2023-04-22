import { files } from '../utils/index.js';

const staticFolderLocal = '../../public/mern/publications';
const staticFolderCloud = 'mern/publications';

const publicationService = {
  validateImagesLen: (imgArray) => {
    const len = imgArray.length;
    return len >= 1 && len <= 4;
  },
  addPublication: async ({ img, data, path }) =>
    await files.addFile({
      img,
      data,
      path,
      staticFolderLocal,
      staticFolderCloud,
    }),
  renamePublication: async ({ data, oldPh, newPh }) =>
    await files.renameFile({
      data,
      oldPh,
      newPh,
      staticFolderLocal,
      staticFolderCloud,
    }),
  deletePublication: async ({ data, oldPh }) =>
    await files.deleteFile({
      data,
      oldPh,
      staticFolderLocal,
      staticFolderCloud,
    }),
};

export default publicationService;
