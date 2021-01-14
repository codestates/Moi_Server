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
    let userInfo = await User.findOne({
      where: {
        snsId: snsId,
        email: email,
      },
    });
    if (userInfo) {
      let token = jwt.sign({ snsId, email, provider }, SECRET);
      res
        .status(200)
        .cookie('accessToken', token, {
          httpOnly: true,
          sameSite: 'none',
          maxAge: 1000 * 60 * 60 * 24 * 7,
        })
        .json({ isLoggedIn: true });
    } else {
      await User.create({
        email: email,
        snsId: snsId,
        provider: provider,
      });
      let token = jwt.sign({ snsId, email, provider }, process.env.JWT_SECRET);
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
