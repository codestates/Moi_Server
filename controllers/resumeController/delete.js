const Resume = require('../../models/resume');

module.exports = async (req, res, next) => {
  const { resumeId } = req.body;
  const { _id } = req.user;
  try {
    await Resume.deleteOne({ _id: resumeId, userId: _id });
    res.status(200).json({ isDeleted: true });
  } catch (err) {
    next(err);
  }
};
