import jwt from 'jsonwebtoken';

const createToken = (user) => {
  return { userId: user._id, username: user.username, role: user.role };
};

const isTokenValid = ({ token }) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

const attachLoginCookie = ({ res, userToken }) => {
  const token = jwt.sign(userToken, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });

  const oneDay = 1000 * 60 * 60 * 24;

  res.cookie('token', token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    secure: process.env.NODE_ENV === 'production',
    signed: true,
    sameSite: 'Lax',
  });
};

const attachLogoutCookie = ({ res }) => {
  const oneSec = 1000;

  res.cookie('token', 'logout', {
    httpOnly: true,
    expires: new Date(Date.now() + oneSec),
    sameSite: 'Lax',
  });
};

export { createToken, isTokenValid, attachLoginCookie, attachLogoutCookie };
