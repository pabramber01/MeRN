import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import { concatUserAvat, lookupPipeline, updateArray } from '../utils/index.js';

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      required: [true, 'Provide username'],
      minlength: [3, 'Username must be atleast 3 long'],
      maxlength: [12, 'Username can not be longer than 12'],
      validate: {
        validator: (val) => !validator.isMongoId(val),
        message: 'Invalid username',
      },
    },
    email: {
      type: String,
      unique: true,
      required: [true, 'Provide email'],
      validate: {
        validator: validator.isEmail,
        message: 'Provide valid email',
      },
    },
    password: {
      type: String,
      required: [true, 'Provide password'],
      minlength: [3, 'Password must be atleast 3 long'],
    },
    role: {
      type: String,
      enum: ['admin', 'user'],
      default: 'user',
    },
    avatar: {
      type: String,
    },
    enabled: {
      type: Boolean,
      default: true,
    },
    follows: {
      type: ['ObjectId'],
      ref: 'User',
      required: true,
    },
    followers: {
      type: ['ObjectId'],
      ref: 'User',
      required: true,
    },
    likes: {
      type: ['ObjectId'],
      ref: 'Publication',
      required: true,
    },
  },
  {
    timestamps: true,
    skipVersioning: { follows: true, followers: true, likes: true },
    toObject: { virtual: true },
    toJSON: {
      virtuals: true,
      transform: (_, ret) => {
        delete ret.id;
      },
    },
  }
);

UserSchema.virtual('publications', {
  ref: 'Publication',
  localField: '_id',
  foreignField: 'user',
  justOne: false,
});

UserSchema.post('aggregate', async function (obj) {
  obj.forEach((u) => {
    const follows =
      typeof u.follows === 'object' && u.follows[0] && u.follows[0].avatar;
    const followers =
      typeof u.followers === 'object' && u.follows[0] && u.followers[0].avatar;
    const avatar = u.avatar;

    if (follows)
      u.follows.forEach((f) => (f.avatar = concatUserAvat(f.avatar, f._id)));
    if (followers)
      u.followers.forEach((f) => (f.avatar = concatUserAvat(f.avatar, f._id)));
    if (avatar) u.avatar = concatUserAvat(u.avatar, u._id);
  });
});

UserSchema.post('findOne', async function (obj) {
  const avatar = obj && obj.avatar;
  if (avatar) obj.avatar = concatUserAvat(obj.avatar, obj._id);
});

UserSchema.post('find', async function (obj) {
  obj.forEach((u) => {
    const avatar = u.avatar;
    if (avatar) u.avatar = concatUserAvat(u.avatar, u._id);
  });
});

UserSchema.post('save', async function (obj) {
  const avatar = obj && obj.avatar;
  if (avatar) obj.avatar = concatUserAvat(obj.avatar, obj._id);
});

UserSchema.pre('save', async function () {
  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
});

UserSchema.pre('save', async function () {
  if (!this.avatar)
    this.avatar = `${Math.ceil(Math.random() * 4)}-defaultAvatar.png`;
  else if (this.avatar.startsWith('http'))
    this.avatar = this.avatar.split('/').splice(-1)[0];
});

UserSchema.pre('remove', async function () {
  await this.model('User').updateMany(...updateArray(this, 'follows'));
  await this.model('User').updateMany(...updateArray(this, 'followers'));
  await this.model('Comment').deleteMany({ user: this._id });
  await this.model('Publication').deleteMany({ user: this._id });
  await this.model('Publication').updateMany(...updateArray(this, 'likedBy'));
});

UserSchema.methods.checkPassword = async function (pass) {
  let isEqual;

  if (typeof pass !== 'string') {
    isEqual = false;
  } else {
    isEqual = await bcrypt.compare(pass, this.password);
  }

  return isEqual;
};

UserSchema.methods.isFollowing = async function (user) {
  return this.follows.includes(user);
};

UserSchema.statics.lookup = async function (params) {
  return this.aggregate(...lookupPipeline(this.schema, params));
};

export default mongoose.model('User', UserSchema);
