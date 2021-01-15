const Resume = require('../../models/resume');

module.exports = async (req, res, next) => {
  if (!req.user) res.status(400).json({ save: false });
  try {
    const { email, name, phone } = req.body.form.info.contact;
    if (!email || !name || !phone) res.status(400).json({ save: false });
    await Resume.create({
      userId: req.user._id,
      ...req.body,
    });
    res.status(200).json({ save: true });
  } catch (err) {
    next(err);
  }
};
