import mongoose from 'mongoose';
import validator from 'validator';
import { publicationService } from './index.js';
import {
  concatPubImg,
  concatUserAvat,
  lookupPipeline,
} from '../utils/index.js';

const PublicationSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      minLength: [3, 'Title must be at least 3 long'],
      maxLength: [20, 'Title can not be longer than 20'],
    },
    description: {
      type: String,
      default: 'Description not provided',
      maxLength: [512, 'Description is too long'],
    },
    images: {
      type: [String],
      required: true,
      validate: {
        validator: publicationService.validateImagesLen,
        message: 'There must be between 1 and 4 pictures',
      },
    },
    user: {
      type: 'ObjectId',
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

PublicationSchema.post('aggregate', async function (obj) {
  obj.forEach((p) => {
    const images = p.images;
    const avatar = p.user && p.user.avatar;

    if (images) p.images = p.images.map((img) => concatPubImg(img, p._id));
    if (avatar) p.user.avatar = concatUserAvat(p.user.avatar, p.user._id);
  });
});

PublicationSchema.post('findOne', async function (obj) {
  const images = obj && obj.images;
  if (images) obj.images = obj.images.map((img) => concatPubImg(img, obj._id));
});

PublicationSchema.post('find', async function (obj) {
  obj.forEach((p) => {
    const images = p.images;
    if (images) p.images = p.images.map((img) => concatPubImg(img, p._id));
  });
});

PublicationSchema.pre('save', async function () {
  if (validator.isEmpty(this.description)) {
    this.description = undefined;
  }
});

PublicationSchema.statics.lookup = async function (params) {
  const attrPath = params.populate.path;
  const model = mongoose.model(this.schema.path(attrPath).options.ref);
  const modelName = model.collection.name;
  return this.aggregate(lookupPipeline(modelName, params));
};

export default mongoose.model('Publication', PublicationSchema);
