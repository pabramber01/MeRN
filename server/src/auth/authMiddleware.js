import { UnauthenticatedError, UnauthorizedError } from '../error/index.js';
import { isTokenValid } from '../utils/index.js';

const isAuthenticated = (req, res, next) => {
  const token = req.signedCookies.token;

  if (!token) {
    throw new UnauthenticatedError('Authentication invalid');
  }

  try {
    const userToken = isTokenValid({ token });
    req.user = userToken;
    next();
  } catch (err) {
    throw new UnauthenticatedError('Authentication invalid');
  }
};

const hasPermission = (...roles) => {
  return (req, res, next) => {
    if (roles.includes(req.user.role)) {
      next();
    } else {
      throw new UnauthorizedError(
        'You do not have permissions to access this route'
      );
    }
  };
};

export default { isAuthenticated, hasPermission };
