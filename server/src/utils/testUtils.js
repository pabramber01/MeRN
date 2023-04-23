import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const testUtils = {
  connectDB: async (mongod) => {
    const url = await mongod.getUri();
    await mongoose.connect(url);
  },
  closeDB: async (mongod) => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongod.stop();
  },
  clearDB: async () => {
    const collections = mongoose.connection.collections;
    for (const key in collections) {
      await collections[key].deleteMany();
    }
  },
  createUser: async (user) => {
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(user.password, salt);
    await mongoose.model('User').collection.insertOne({ ...user, password });
  },
  createPublication: async (publication) => {
    await mongoose.model('Publication').collection.insertOne(publication);
  },
  createComment: async (comment) => {
    await mongoose.model('Comment').collection.insertOne(comment);
  },
  loginUser: async (server, user) => {
    await server.post('/mern/v1/auth/login').send(user);
  },
  logoutUser: async (server) => {
    await server.get('/mern/v1/auth/logout');
  },
};

export default testUtils;
