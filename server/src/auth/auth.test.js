import { connectTestDB, closeTestDB, clearTestDB } from '../utils/db';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { app } from '../app.js';
import request from 'supertest';
import mongoose from 'mongoose';

const mongod = await MongoMemoryServer.create();

beforeAll(async () => {
  await connectTestDB(mongod);
});

afterAll(async () => {
  await closeTestDB(mongod);
});

beforeEach(async () => {
  await mongoose.model('User').collection.insertOne({
    username: 'test',
    password: '$2a$10$tuKaIO7teHjaWq3BYczVoe7hnaOhwJGXVxuhV55WQ0oN/yMc52/E6',
  });
});

afterEach(async () => {
  await clearTestDB();
});

describe('POST /mern/v1/auth/login', () => {
  it('should login an user', async () => {
    const res = await request(app).post('/mern/v1/auth/login').send({
      username: 'test',
      password: 'test',
    });
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.user.username).toBe('test');
  });
});

describe('POST /mern/v1/auth/login', () => {
  it('should not login an user', async () => {
    const res = await request(app).post('/mern/v1/auth/login').send({
      username: 'test',
      password: 'wrong_pass',
    });
    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBe(false);
    expect(res.body.msg).toBe('Invalid credentials');
  });
});

describe('GET /mern/v1/auth/logout', () => {
  it('should logout an user', async () => {
    const res = await request(app).get('/mern/v1/auth/logout');
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.msg).toBe('See you soon!');
  });
});
