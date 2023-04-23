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

const publication = {
  _id: Types.ObjectId('536f710fc55b2acc61000bc4'),
  user: Types.ObjectId('536f710fc55b2acc61000bc3'),
  title: 'Examoke',
  description: "Irony four dollar toast polaroid 90's",
  images: [],
  likedBy: [],
  createdAt: '2023-02-08T18:17:21.368Z',
  updatedAt: '2023-02-08T18:17:21.368Z',
};

beforeAll(async () => {
  await testUtils.connectDB(mongod);
});

afterAll(async () => {
  await testUtils.closeDB(mongod);
});

beforeEach(async () => {
  await testUtils.createUser(user);
  await testUtils.createPublication(publication);
  await testUtils.loginUser(server, user);
});

afterEach(async () => {
  await testUtils.clearDB();
});

describe('GET /mern/v1/publications', () => {
  it('should get all publications', async () => {
    const res = await server.get('/mern/v1/publications');
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.length).toBe(1);
  });
});

describe('GET /mern/v1/publications/:id', () => {
  it('should get publication', async () => {
    const res = await server.get(
      `/mern/v1/publications/${publication._id.toString()}`
    );
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data._id).toBe(publication._id.toString());
  });
});

describe('GET /mern/v1/publications/:id', () => {
  it('should not get publication (not mongo id)', async () => {
    const res = await server.get('/mern/v1/publications/dsadasd');
    expect(res.statusCode).toBe(404);
    expect(res.body.success).toBe(false);
    expect(res.body.msg).toBe("No publication found with id: 'dsadasd'");
  });
});

describe('GET /mern/v1/publications/:id', () => {
  it('should not get publication (not found)', async () => {
    const res = await server.get(
      '/mern/v1/publications/536f710fc55b2acc61000bc5'
    );
    expect(res.statusCode).toBe(404);
    expect(res.body.success).toBe(false);
    expect(res.body.msg).toBe(
      "No publication found with id: '536f710fc55b2acc61000bc5'"
    );
  });
});
