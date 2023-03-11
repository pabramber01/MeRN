import mongoose from 'mongoose';
import validator from 'validator';
import { publicationService } from './index.js';

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

PublicationSchema.post(/(find|findOne)/, async function (obj) {
  if (!obj) return;

  let id;
  const concatBaseUrl = (img) =>
    `${process.env.BASE_URL}/mern/static/publications/${id}/${img}`;

  if (Array.isArray(obj)) {
    obj.forEach((pub) => {
      id = pub._id;
      pub.images = pub.images.map(concatBaseUrl);
    });
  } else {
    id = obj._id;
    obj.images = obj.images.map(concatBaseUrl);
  }
});

PublicationSchema.pre('save', async function () {
  if (validator.isEmpty(this.description)) {
    this.description = undefined;
  }
});

export default mongoose.model('Publication', PublicationSchema);
