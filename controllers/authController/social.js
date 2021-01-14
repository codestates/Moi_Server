const User = require('../../models/user');
const jwt = require('jsonwebtoken');

module.exports = async (req, res) => {
  const { snsId, provider } = req.body;
  const email = req.body.email || null;
  if (!snsId) {
    res.status(500).json({
      isLoggedIn: false,
    });
  } else {
    let userInfo = await await User.where({ snsId: snsId }).findOne();
    if (userInfo) {
      let token = jwt.sign(
        {
          _id: userInfo._id,
          snsId: userInfo.snsId,
          email: userInfo.email,
          provider: userInfo.provider,
        },
        process.env.JWT_SECRET,
        { expiresIn: '7d' },
      );
      res
        .status(200)
        .cookie('accessToken', token, {
          httpOnly: true,
          sameSite: 'none',
          maxAge: 1000 * 60 * 60 * 24 * 7,
        })
        .json({ isLoggedIn: true });
    } else {
      const newUser = await User.create({
        email: email,
        snsId: snsId,
        provider: provider,
      });
      let token = jwt.sign(
        {
          _id: newUser._id,
          snsId: newUser.snsId,
          email: newUser.email,
          provider: newUser.provider,
        },
        process.env.JWT_SECRET,
      );
      res
        .status(200)
        .cookie('accessToken', token, {
          httpOnly: true,
          sameSite: 'none',
          maxAge: 1000 * 60 * 60 * 24 * 7,
        })
        .json({ isLoggedIn: true });
    }
  }
};
