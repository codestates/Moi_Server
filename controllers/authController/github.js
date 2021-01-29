const axios = require('axios');
const User = require('../../models/user');
const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
  try {
    const { authorizationCode } = req.body;
    const clientId = process.env.GITHUB_CLENT_ID;
    const secretKey = process.env.GITHUB_SECRET_KEY;
    const githubToken = await axios.post(
      'https://github.com/login/oauth/access_token',
      {
        code: authorizationCode,
        client_id: clientId,
        client_secret: secretKey,
      },
      {
        headers: {
          accept: 'application/json',
        },
      },
    );

    const { access_token } = githubToken.data;
    const githubData = await axios.get('https://api.github.com/user', {
      headers: {
        Authorization: `token ${access_token}`,
      },
    });
    const { id, email, avatar_url } = githubData.data;
    const exUser = await User.where({ snsId: id }).findOne();
    if (exUser) {
      const token = jwt.sign(
        {
          _id: exUser._id,
          snsId: exUser.snsId,
          email: exUser.email,
          provider: exUser.provider,
          thumbnail: exUser.thumbnail,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: '7d',
        },
      );

      res
        .status(200)
        .cookie('accessToken', token, {
          httpOnly: true,
          secure: false,
          maxAge: 1000 * 60 * 60 * 24 * 7,
          sameSite: 'lax',
        })
        .json({
          currentUser: {
            id: exUser._id,
            email: exUser.email,
            thumbnail: exUser.thumbnail,
          },
        });
    } else {
      const user = new User({
        snsId: id,
        email: email ? email : null,
        provider: 'github',
        thumbnail: avatar_url,
      });
      const newUser = await user.save();
      const token = jwt.sign(
        {
          _id: newUser._id,
          snsId: newUser.snsId,
          email: newUser.email,
          provider: newUser.provider,
          thumbnail: newUser.thumbnail,
        },
        process.env.JWT_SECRET,
        { expiresIn: '7d' },
      );

      res
        .status(200)
        .cookie('accessToken', token, {
          httpOnly: true,
          sameSite: 'lax',
          maxAge: 1000 * 60 * 60 * 24 * 7,
        })
        .json({
          currentUser: {
            id: newUser._id,
            email: newUser.email,
            thumbnail: newUser.thumbnail,
          },
        });
    }
  } catch (err) {
    next(err);
  }
};
