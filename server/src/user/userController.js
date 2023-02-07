import { StatusCodes } from 'http-status-codes';
import { User } from './index.js';
import { createToken, attachLoginCookie } from '../utils/index.js';

async function createUser(req, res) {
  const { username, email, password } = req.body;

  const user = await User.create({ username, email, password });

  const userToken = createToken(user);
  attachLoginCookie({ res, userToken });
  res
    .status(StatusCodes.CREATED)
    .json({ success: true, data: { user: userToken } });
}

export default { createUser };
