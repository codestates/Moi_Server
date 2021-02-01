const axios = require("axios");
const User = require("../../models/user");
const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  try {
    const { authorizationCode } = req.body;
    const clientId = process.env.KAKAO_CLIENT_ID;
    const clientKey = process.env.KAKAO_SECRET_KEY;
    const kakaoToken = await axios.post(
      `https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${clientId}&client_secret=${clientKey}&redirect_uri=http://https://www.everymoi.com&code=${authorizationCode}`
    );
    const { access_token } = kakaoToken.data;
    const kakaoData = await axios.get("https://kapi.kakao.com/v2/user/me", {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    const {
      id,
      kakao_account: {
        email,
        profile: { thumbnail_image_url },
      },
    } = kakaoData.data;
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
          expiresIn: "7d",
        }
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
        provider: "kakao",
        thumbnail: thumbnail_image_url,
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
