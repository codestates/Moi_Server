const Resume = require('../../models/resume');

module.exports = (req, res) => {
  try {
    if (!req.user) res.status(400).json({ edit: false });
    const resumeId = req.params.resumeId;
    const resume = Resume.findOne({
      query: { _id: resumeId },
    });
    res.status(200).json({ edit: true, resume: resume });
  } catch (err) {
    console.log(err);
    res.status(400).json({ edit: false });
  }
};
