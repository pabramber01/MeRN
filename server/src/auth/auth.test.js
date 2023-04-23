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

const userBan = {
  _id: Types.ObjectId('536f710fc55b2acc61000bc4'),
  username: 'test2',
  password: 'test2',
  email: 'test2@mern.com',
  enabled: false,
};

beforeAll(async () => {
  await testUtils.connectDB(mongod);
});

afterAll(async () => {
  await testUtils.closeDB(mongod);
});

beforeEach(async () => {
  await testUtils.createUser(user);
});

afterEach(async () => {
  await testUtils.clearDB();
});

describe('POST /mern/v1/auth/login', () => {
  it('should login an user', async () => {
    const res = await server.post('/mern/v1/auth/login').send({
      username: user.username,
      password: user.password,
    });
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.user.username).toBe(user.username);
  });
});

describe('POST /mern/v1/auth/login', () => {
  it('should not login an user (wrong username)', async () => {
    const res = await server.post('/mern/v1/auth/login').send({
      username: 'wrong_user',
      password: 'not_user',
    });
    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBe(false);
    expect(res.body.msg).toBe('Invalid credentials');
  });
});

describe('POST /mern/v1/auth/login', () => {
  it('should not login an user (wrong password)', async () => {
    const res = await server.post('/mern/v1/auth/login').send({
      username: user.username,
      password: 'wrong_pass',
    });
    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBe(false);
    expect(res.body.msg).toBe('Invalid credentials');
  });
});

describe('POST /mern/v1/auth/login', () => {
  it('should not login an user (banned user)', async () => {
    await testUtils.createUser(userBan);
    const res = await server.post('/mern/v1/auth/login').send({
      username: userBan.username,
      password: userBan.password,
    });
    expect(res.statusCode).toBe(403);
    expect(res.body.success).toBe(false);
    expect(res.body.msg).toBe('You are banned from this site');
  });
});

describe('GET /mern/v1/auth/logout', () => {
  it('should logout an user', async () => {
    const res = await server.get('/mern/v1/auth/logout');
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.msg).toBe('See you soon!');
  });
});
