const User = require('../../models/user');
const Resume = require('../../models/resume');

module.exports = async (req, res, next) => {
  const { _id } = req.user;
  try {
    if (req.user) {
      await User.deleteOne({ _id });
      res.clearCookie('accessToken');
      res.status(200).json({ withdrawal: true });
    } else {
      res.status(400).json({ withdrawal: false });
    }
  } catch (err) {
    next(err);
  }
};
