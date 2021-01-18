const Resume = require('../../models/resume');

module.exports = async (req, res, next) => {
  try {
    if (!req.user) res.status(400).json({ isGetResume: false });
    const resumeId = req.params.resumeId;
    const resume = await Resume.findOne({
      query: { _id: resumeId },
    });
    res.status(200).json({ isGetResume: true, resume: resume });
  } catch (err) {
    next(err);
  }
};
