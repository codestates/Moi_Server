const Resume = require('../../models/resume');

module.exports = async (req, res) => {
  try {
    if (!req.user) res.status(400).json({ edit: false });
    const { email, name, phone } = req.body.form.info.contact;
    if (!email || !name || !phone) res.status(400).json({ edit: false });

    const userResume = await Resume.findOne({
      _id: req.body._id,
      userId: req.user._id,
    });
    if (!userResume) res.status(400).json({ edit: false });

    await Resume.updateOne(
      { _id: req.body._id, userId: req.user._id },
      { $set: { ...req.body } },
      { returnNewDocument: true },
    );
    res.status(200).json({ edit: true });
  } catch (err) {
    console.log(err);
    res.status(400).json({ edit: false });
  }
};
