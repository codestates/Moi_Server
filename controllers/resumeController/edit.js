const Resume = require('../../models/resume');

module.exports = (req, res, next) => {
  try {
    if (!req.user) res.status(400).json({ edit: false });

    const { email, name, phone } = req.body.form.info.contact;
    if (!email || !name || !phone) res.status(400).json({ edit: false });

    const resume = Resume.find({
      _id: req.body._id,
      userId: req.body.userId,
    });
    if (!resume) res.status(400).json({ edit: false });
    const editResume = Resume.updateOne(
      { _id: req.body._id, userId: req.body.userId },
      { $set: { ...req.body } },
    );
    res.status(200).json({ edit: true, resume: editResume });
  } catch (err) {
    next(err);
  }
};
