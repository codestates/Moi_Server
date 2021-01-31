const User = require('../../models/user');
const Resume = require('../../models/resume');
const { deleteProfiles } = require('../../lib/multerMiddleware');

module.exports = async (req, res, next) => {
  const { _id } = req.user;
  try {
    if (req.user) {
      const resumes = await Resume.find({ userId: _id });
      resumes
        .filter((item) => item.info.avatar)
        .map((el) => {
          const {
            info: { avatar },
          } = el;
          if (avatar) {
            deleteProfiles(avatar);
          }
        });
      await Resume.deleteMany({ userId: _id });
      await User.deleteOne({ _id });
      res.status(200).json({ withdrawal: true });
    } else {
      res.status(401).json({ withdrawal: false });
    }
  } catch (err) {
    next(err);
  }
};
