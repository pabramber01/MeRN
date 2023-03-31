import { StatusCodes } from 'http-status-codes';
import { BadRequestError, UnauthorizedError } from '../error/index.js';
import { User } from '../user/index.js';
import {
  createToken,
  attachLoginCookie,
  attachLogoutCookie,
} from '../utils/index.js';

async function loginUser(req, res) {
  const { username, password } = req.body;

  const data = await User.findOne({ username });

  if (!data) {
    throw new BadRequestError('Invalid credentials');
  }

  if (!data.enabled) {
    throw new UnauthorizedError('You are banned from this site');
  }

  const passwordMatch = await data.checkPassword(password);
  if (!passwordMatch) {
    throw new BadRequestError('Invalid credentials');
  }

  const userToken = createToken(data);
  attachLoginCookie({ res, userToken });
  res.status(StatusCodes.OK).json({ success: true, data: { user: userToken } });
}

async function logoutUser(req, res) {
  attachLogoutCookie({ res });
  res
    .status(StatusCodes.OK)
    .json({ success: true, data: { msg: 'See you soon!' } });
}

export default { loginUser, logoutUser };
