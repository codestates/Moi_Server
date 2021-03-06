const User = require("../../models/user");
const jwt = require("jsonwebtoken");
const axios = require("axios");

module.exports = async (req, res, next) => {
  try {
    const { authorizationCode } = req.body;
    const googleToken = await axios.post(
      "https://oauth2.googleapis.com/token",
      {
        code: authorizationCode,
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_SECRET_KEY,
        redirect_uri: "https://www.everymoi.com",
        grant_type: "authorization_code",
      }
    );
    const { access_token } = googleToken.data;
    const googleData = await axios.get(
      `https://www.googleapis.com/oauth2/v2/userinfo/?access_token=${access_token}`
    );
    const { id, email, picture } = googleData.data;
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
        { expiresIn: "7d" }
      );
      res
        .status(200)
        .cookie("accessToken", token, {
          httpOnly: true,
          secure: true,
          maxAge: 1000 * 60 * 60 * 24 * 7,
          sameSite: "none",
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
        email: email,
        provider: "google",
        thumbnail: picture,
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
        { expiresIn: "7d" }
      );
      res
        .status(200)
        .cookie("accessToken", token, {
          httpOnly: true,
          sameSite: "none",
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
