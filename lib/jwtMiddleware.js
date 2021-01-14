const jwt = require('jsonwebtoken');
const User = require('../models/user');

const jwtMiddleware = async (req, res, next) => {
  const token = req.cookies['accessToken'];
  const error = new Error('The token does not exist.');
  error.status = 401;
  if (!token) next(error);
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = {
      _id: decoded._id,
      snsId: decoded.snsId,
      provider: decoded.provider,
    };
    const now = Math.floor(Date.now() / 1000);
    if (decoded.exp - now < 60 * 60 * 24 * 3.5) {
      const user = await User.findById(decoded._id);
      const refreshToken = jwt.sign(
        {
          _id: user._id,
          snsId: user.snsId,
          provider: user.provider,
        },
        process.env.JWT_SECRET,
        { expiresIn: '7d' },
      );
      res.cookie('accessToken', refreshToken, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 7,
        sameSite: 'none',
      });
    }
    return next();
  } catch (err) {
    next(err);
  }
};

module.exports = jwtMiddleware;
