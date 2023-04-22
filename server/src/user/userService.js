import { v2 as cloudinary } from 'cloudinary';
import { fileURLToPath } from 'url';
import p, { dirname } from 'path';
import fs from 'fs/promises';

const __dirname = dirname(fileURLToPath(import.meta.url));
const staticFolderLocal = '../../public/mern/users';
const staticFolderCloud = 'mern/users';

const userService = {
  addAvatar: async ({ img, data, path }) => {
    if (process.env.NODE_ENV !== 'production') {
      const relativePath = `${staticFolderLocal}/${data._id}/${path}`;
      const mainPath = p.join(__dirname, relativePath);
      await img.mv(mainPath);
    } else {
      const oldTmp = img.tempFilePath;
      const newTmp = oldTmp.replace(p.basename(oldTmp), path);
      await fs.rename(oldTmp, newTmp);
      await cloudinary.uploader.upload(newTmp, {
        type: 'authenticated',
        use_filename: true,
        unique_filename: false,
        folder: `${staticFolderCloud}/${data._id}`,
        resource_type: 'auto',
      });
      await fs.unlink(newTmp);
    }
  },
  deleteAvatar: async ({ data, oldPh }) => {
    oldPh = oldPh ? `/${oldPh}` : '';

    if (process.env.NODE_ENV !== 'production') {
      const relativePath = `${staticFolderLocal}/${data._id}${oldPh}`;
      const mainPath = p.join(__dirname, relativePath);
      await fs.rm(mainPath, { recursive: true, force: true });
    } else {
      let publicId = `${staticFolderCloud}/${data._id}${oldPh}`;
      if (oldPh) publicId = publicId.substring(0, publicId.lastIndexOf('.'));
      await cloudinary.api.delete_resources_by_prefix(publicId, {
        type: 'authenticated',
      });
      if (!oldPh) await cloudinary.api.delete_folder(publicId);
    }
  },
};

export default userService;
