import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: [true, 'Provide username'],
    minlength: [3, 'Username must be atleast 3 long'],
    maxlength: [12, 'Username can not be longer than 12'],
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
});

UserSchema.pre('save', async function () {
  if (!this.isModified('password')) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.pre('remove', async function () {
  await this.model('Publication').deleteMany({ user: this._id });
});

UserSchema.methods.checkPassword = async function (pass) {
  const isEqual = await bcrypt.compare(pass, this.password);
  return isEqual;
};

export default mongoose.model('User', UserSchema);
