import mongoose from 'mongoose';
import { lookupPipeline, concatUserAvat } from '../utils/index.js';

const CommentSchema = new mongoose.Schema(
  {
    comment: {
      type: String,
      required: [true, 'Please provide comment'],
      maxLength: [512, 'Comment is too long'],
    },
    user: {
      type: 'ObjectId',
      ref: 'User',
      required: true,
    },
    publication: {
      type: 'ObjectId',
      ref: 'Publication',
      required: [true, 'Provide publication'],
    },
  },
  { timestamps: true }
);

CommentSchema.post('aggregate', async function (obj) {
  obj.forEach((c) => {
    const avatar = c.user && c.user.avatar;

    if (avatar) c.user.avatar = concatUserAvat(c.user.avatar, c.user._id);
  });
});

CommentSchema.statics.lookup = async function (params) {
  return this.aggregate(lookupPipeline(this.schema, params));
};

export default mongoose.model('Comment', CommentSchema);
