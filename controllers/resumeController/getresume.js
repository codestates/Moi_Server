const Resume = require('../../models/resume');

module.exports = async (req, res, next) => {
  try {
    if (!req.user) res.status(400).json({ getResume: false });
    const resumeId = req.params.resumeId;
    const resume = await Resume.findOne({
      query: { _id: resumeId },
    });
    res.status(200).json({ getResume: true, resume: resume });
  } catch (err) {
    next(err);
  }
};
