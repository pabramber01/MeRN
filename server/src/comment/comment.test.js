import { testUtils } from '../utils/index.js';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { Types } from 'mongoose';
import app from '../app.js';
import request from 'supertest';
import validator from 'validator';

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
  _id: Types.ObjectId('536f710fc55b2acc41000bc3'),
  username: 'test2',
  password: 'test2',
  email: 'test2@mern.com',
  enabled: false,
};

const publication = {
  _id: Types.ObjectId('536f710fc55b2acc61000bc9'),
  user: Types.ObjectId('536f710fc55b2acc61000bc3'),
};

const publicationUserBan = {
  _id: Types.ObjectId('536f710fc55b2a4c61000bc9'),
  user: Types.ObjectId('536f710fc55b2acc41000bc3'),
};

const comment = {
  _id: Types.ObjectId('536f710fc55b2acc61000bc1'),
  user: Types.ObjectId('536f710fc55b2acc61000bc3'),
  publication: Types.ObjectId('536f710fc55b2acc61000bc9'),
};

const commentUserBan = {
  _id: Types.ObjectId('536f710fc55b2acc61030bc1'),
  user: Types.ObjectId('536f710fc55b2acc41000bc3'),
  publication: Types.ObjectId('536f710fc55b2a4c61000bc9'),
};

const commentOtherUser = {
  _id: Types.ObjectId('536f710fc55b2acc61000bc2'),
  user: Types.ObjectId('536f710fc55b2acc61000bc4'),
  publication: Types.ObjectId('536f710fc55b2acc61000bc9'),
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
  await testUtils.createComment(comment);
  await testUtils.loginUser(server, user);
});

afterEach(async () => {
  await testUtils.clearDB();
});

describe('POST /mern/v1/comments', () => {
  it('should comment', async () => {
    const res = await server.post('/mern/v1/comments').send({
      comment: 'some text',
      publication: publication._id.toString(),
    });
    expect(res.statusCode).toBe(201);
    expect(res.body.success).toBe(true);
    expect(validator.isMongoId(res.body.data._id)).toBe(true);
  });
});

describe('POST /mern/v1/comments', () => {
  it('should not comment (not login)', async () => {
    await testUtils.logoutUser(server, user);
    const res = await request(app).post('/mern/v1/comments').send({});
    expect(res.statusCode).toBe(401);
    expect(res.body.success).toBe(false);
    expect(res.body.msg).toBe('Authentication invalid');
  });
});

describe('POST /mern/v1/comments', () => {
  it('should not comment (publication id not ObjectId)', async () => {
    const res = await server.post('/mern/v1/comments').send({
      comment: 'some text',
      publication: 'not mongo id',
    });
    expect(res.statusCode).toBe(404);
    expect(res.body.success).toBe(false);
    expect(res.body.msg).toBe('No publication found with id: not mongo id');
  });
});

describe('POST /mern/v1/comments', () => {
  it('should not comment (publication id not found)', async () => {
    const res = await server.post('/mern/v1/comments').send({
      comment: 'some text',
      publication: '536f710fc55b2acc61000bc4',
    });
    expect(res.statusCode).toBe(404);
    expect(res.body.success).toBe(false);
    expect(res.body.msg).toBe(
      'No publication found with id: 536f710fc55b2acc61000bc4'
    );
  });
});

describe('PATCH /mern/v1/comments/:id', () => {
  it('should update comment', async () => {
    const res = await server
      .patch(`/mern/v1/comments/${comment._id.toString()}`)
      .send({
        comment: 'some text updated',
      });
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data._id).toBe(comment._id.toString());
  });
});

describe('PATCH /mern/v1/comments/:id', () => {
  it('should not update comment (not found)', async () => {
    const res = await server
      .patch('/mern/v1/comments/536f710fc55b2acc61000bc2')
      .send({
        comment: 'some text updated',
      });
    expect(res.statusCode).toBe(404);
    expect(res.body.success).toBe(false);
    expect(res.body.msg).toBe(
      'No comment found with id: 536f710fc55b2acc61000bc2'
    );
  });
});

describe('PATCH /mern/v1/comments/:id', () => {
  it('should not update comment (not own)', async () => {
    await testUtils.createComment(commentOtherUser);
    const res = await server
      .patch(`/mern/v1/comments/${commentOtherUser._id.toString()}`)
      .send({
        comment: 'some text updated',
      });
    expect(res.statusCode).toBe(403);
    expect(res.body.success).toBe(false);
    expect(res.body.msg).toBe('Invalid credentials');
  });
});

describe('PATCH /mern/v1/comments/:id', () => {
  it('should not update comment (not own ban)', async () => {
    await testUtils.createUser(userBan);
    await testUtils.createPublication(publicationUserBan);
    await testUtils.createComment(commentUserBan);
    const res = await server
      .patch(`/mern/v1/comments/${commentUserBan._id.toString()}`)
      .send({
        comment: 'some text updated',
      });
    expect(res.statusCode).toBe(404);
    expect(res.body.success).toBe(false);
    expect(res.body.msg).toBe(
      `No post found with id: ${commentUserBan.publication}`
    );
  });
});

describe('DELETE /mern/v1/comments/:id', () => {
  it('should delete comment', async () => {
    const res = await server.delete(
      `/mern/v1/comments/${comment._id.toString()}`
    );
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data._id).toBe(comment._id.toString());
  });
});

describe('DELETE /mern/v1/comments/:id', () => {
  it('should not delete comment (not found)', async () => {
    const res = await server.delete(
      '/mern/v1/comments/536f710fc55b2acc61000bc2'
    );
    expect(res.statusCode).toBe(404);
    expect(res.body.success).toBe(false);
    expect(res.body.msg).toBe(
      'No comment found with id: 536f710fc55b2acc61000bc2'
    );
  });
});

describe('DELETE /mern/v1/comments/:id', () => {
  it('should not delete comment (not own)', async () => {
    await testUtils.createComment(commentOtherUser);
    const res = await server.delete(
      `/mern/v1/comments/${commentOtherUser._id.toString()}`
    );
    expect(res.statusCode).toBe(403);
    expect(res.body.success).toBe(false);
    expect(res.body.msg).toBe('Invalid credentials');
  });
});

describe('DELETE /mern/v1/comments/:id', () => {
  it('should not delete comment (not own ban)', async () => {
    await testUtils.createUser(userBan);
    await testUtils.createPublication(publicationUserBan);
    await testUtils.createComment(commentUserBan);
    const res = await server.delete(
      `/mern/v1/comments/${commentUserBan._id.toString()}`
    );
    expect(res.statusCode).toBe(404);
    expect(res.body.success).toBe(false);
    expect(res.body.msg).toBe(
      `No post found with id: ${commentUserBan.publication}`
    );
  });
});
