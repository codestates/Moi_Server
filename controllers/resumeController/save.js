const Resume = require('../../models/resume');

module.exports = async (req, res, next) => {
  if (!req.user) res.status(401).json({ save: false });
  try {
    const {
      contact: { email, phone, address },
      title,
    } = req.body.values.info;
    if (title === '') {
      delete req.body.values.info.title;
    }
    const resume = new Resume();
    const createdAt = resume.dateFormatting(new Date());
    const updatedAt = resume.dateFormatting(new Date());
    await Resume.create({
      userId: req.user._id,
      ...req.body.values,
      createdAt,
      updatedAt,
    });
    res.status(200).json({ save: true });
  } catch (err) {
    next(err);
  }
};
