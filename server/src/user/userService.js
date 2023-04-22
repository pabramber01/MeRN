import { files } from '../utils/index.js';

const staticFolderLocal = '../../public/mern/users';
const staticFolderCloud = 'mern/users';

const userService = {
  addAvatar: async ({ img, data, path }) =>
    await files.addFile({
      img,
      data,
      path,
      staticFolderLocal,
      staticFolderCloud,
    }),
  deleteAvatar: async ({ data, oldPh }) =>
    await files.deleteFile({
      data,
      oldPh,
      staticFolderLocal,
      staticFolderCloud,
    }),
};

export default userService;
