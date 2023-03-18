import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';

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
  },
  {
    toJSON: {
      virtuals: true,
      transform: (doc, ret) => {
        delete ret.id;
      },
    },
    toObject: { virtual: true },
    optimisticConcurrency: true,
  }
);

UserSchema.virtual('publications', {
  ref: 'Publication',
  localField: '_id',
  foreignField: 'user',
  justOne: false,
});

UserSchema.post(/(find|findOne)/, async function (obj) {
  const noUser = !obj;
  if (noUser) return;
  const withoutAvatar = Array.isArray(obj) ? !obj[0].avatar : !obj.avatar;
  if (withoutAvatar) return;

  const concatBaseUrl = (img, id) => {
    const route = img.includes('default')
      ? 'common/static/avatars'
      : `mern/static/users/${id}`;
    return `${process.env.BASE_URL}/${route}/${img}`;
  };

  if (Array.isArray(obj)) {
    obj.forEach((user) => {
      user.avatar = concatBaseUrl(user.avatar, user._id);
    });
  } else {
    obj.avatar = concatBaseUrl(obj.avatar, obj._id);
  }
});

UserSchema.pre('save', async function () {
  if (!this.isModified('password')) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.pre('save', async function () {
  if (!this.avatar)
    this.avatar = `${Math.ceil(Math.random() * 4)}-defaultAvatar.png`;
});

UserSchema.pre('remove', async function () {
  await this.model('Publication').deleteMany({ user: this._id });
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

export default mongoose.model('User', UserSchema);
