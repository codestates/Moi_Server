const Resume = require('../../models/resume');

module.exports = async (req, res, next) => {
  const { resumeId } = req.body;
  const { _id } = req.user;
  try {
    if (req.user) {
      await Resume.deleteOne({ _id: resumeId, userId: _id });
      res.status(200).json({ isDeleted: true });
    } else {
      res.status(401).json({ isDeleted: false });
    }
  } catch (err) {
    next(err);
  }
};
