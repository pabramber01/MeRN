import mongoose from 'mongoose';
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
      default: 'No provided',
      maxLength: [512, 'Description is too long'],
    },
    images: {
      type: [String],
      required: true,
      validator: {
        validate: publicationService.validateImagesLen,
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

export default mongoose.model('Publication', PublicationSchema);
