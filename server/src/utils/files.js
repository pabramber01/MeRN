import { v2 as cloudinary } from 'cloudinary';
import { fileURLToPath } from 'url';
import p, { dirname } from 'path';
import fs from 'fs/promises';

const __dirname = dirname(fileURLToPath(import.meta.url));

const files = {
  addFile: async ({
    img,
    data,
    path,
    staticFolderLocal,
    staticFolderCloud,
  }) => {
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
  renameFile: async ({
    data,
    oldPh,
    newPh,
    staticFolderLocal,
    staticFolderCloud,
  }) => {
    if (process.env.NODE_ENV !== 'production') {
      const relativeOldPath = `${staticFolderLocal}/${data._id}/${oldPh}`;
      const mainOldPath = p.join(__dirname, relativeOldPath);
      const relativeNewPath = `${staticFolderLocal}/${data._id}/${newPh}`;
      const mainNewPath = p.join(__dirname, relativeNewPath);
      await fs.rename(mainOldPath, mainNewPath);
    } else {
      let oldPublicId = `${staticFolderCloud}/${data._id}/${oldPh}`;
      oldPublicId = oldPublicId.substring(0, oldPublicId.lastIndexOf('.'));
      let newPublicId = `${staticFolderCloud}/${data._id}/${newPh}`;
      newPublicId = newPublicId.substring(0, newPublicId.lastIndexOf('.'));
      console.log(oldPublicId, newPublicId);
      await cloudinary.uploader.rename(oldPublicId, newPublicId, {
        type: 'authenticated',
        resource_type: 'image',
      });
    }
  },
  deleteFile: async ({ data, oldPh, staticFolderLocal, staticFolderCloud }) => {
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

export default files;
