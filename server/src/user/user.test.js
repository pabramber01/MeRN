import { testUtils } from '../utils/index.js';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { Types } from 'mongoose';
import app from '../app.js';
import request from 'supertest';

const server = request.agent(app);

const mongod = await MongoMemoryServer.create();

const user = {
  _id: Types.ObjectId('536f710fc55b2acc61000bc3'),
  username: 'test',
  password: 'test',
  email: 'test@mern.com',
  enabled: true,
};

beforeAll(async () => {
  await testUtils.connectDB(mongod);
});

afterAll(async () => {
  await testUtils.closeDB(mongod);
});

beforeEach(async () => {
  await testUtils.createUser(user);
  await testUtils.loginUser(server, user);
});

afterEach(async () => {
  await testUtils.clearDB();
});

describe('POST /mern/v1/users', () => {
  it('should create user', async () => {
    const res = await server.post('/mern/v1/users').send({
      username: 'example',
      email: 'example@example.com',
      password: 'example',
    });
    expect(res.statusCode).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.user.username).toBe('example');
  });
});

describe('POST /mern/v1/users', () => {
  it('should not create user (to short username)', async () => {
    const res = await server.post('/mern/v1/users').send({
      username: 'ex',
      email: 'example@example.com',
      password: 'example',
    });
    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBe(false);
    expect(res.body.msg).toBe('Username must be atleast 3 long');
  });
});

describe('GET /mern/v1/users/own', () => {
  it('should get user personal data', async () => {
    const res = await server.get('/mern/v1/users/own');
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.username).toBe(user.username);
  });
});
