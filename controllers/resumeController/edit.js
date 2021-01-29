const Resume = require('../../models/resume');

module.exports = async (req, res, next) => {
  try {
    if (!req.user) res.status(400).json({ isEdited: false });
    const { email, username, phone } = req.body.values.info.contact;
    if (!email || !username || !phone)
      res.status(400).json({ isEdited: false });

    const userResume = await Resume.findOne({
      _id: req.body.resumeId,
      userId: req.user._id,
    });

    if (!userResume) res.status(400).json({ isEdited: false });
    const resume = new Resume();
    const updatedAt = resume.dateFormatting(new Date());
    await Resume.updateOne(
      { _id: req.body.resumeId, userId: req.user._id },
      { $set: { ...req.body, updatedAt } },
      { returnNewDocument: true },
    );
    const newResume = await Resume.findOne({
      _id: req.body.resumeId,
      userId: req.user._id,
    });
    res.status(200).json({ isEdited: true, newResume });
  } catch (err) {
    next(err);
  }
};
