const Resume = require('../../models/resume');
const { deleteProfiles } = require('../../lib/multerMiddleware');

module.exports = async (req, res, next) => {
  const { resumeId } = req.body;
  const { _id } = req.user;
  try {
    if (req.user) {
      const {
        info: { avatar },
      } = await Resume.findOne({ _id: resumeId });
      await deleteProfiles(avatar);
      await Resume.deleteOne({ _id: resumeId, userId: _id });
      res.status(200).json({ isDeleted: true });
    } else {
      res.status(401).json({ isDeleted: false });
    }
  } catch (err) {
    next(err);
  }
};
