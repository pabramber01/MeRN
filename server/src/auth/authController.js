import { StatusCodes } from 'http-status-codes';
import { UnauthenticatedError } from '../error/index.js';
import { User } from '../user/index.js';
import {
  createToken,
  attachLoginCookie,
  attachLogoutCookie,
} from '../utils/index.js';

async function loginUser(req, res) {
  const { username, password } = req.body;

  const user = await User.findOne({ username });

  if (!user) {
    throw new UnauthenticatedError('Invalid credentials');
  }

  const passwordMatch = await user.checkPassword(password);
  if (!passwordMatch) {
    throw new UnauthenticatedError('Invalid credentials');
  }

  const userToken = createToken(user);
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
