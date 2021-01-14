const Resume = require('../../models/resume');

module.exports = async (req, res) => {
  if (!req.user) res.status(400).json({ save: false });
  try {
    await Resume.create({
      userId: req.user._id,
      ...req.body,
    });
    res.status(200).json({ save: true });
  } catch (err) {
    console.log(err);
    res.status(400).json({ save: false });
  }
};
