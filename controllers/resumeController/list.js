const Resume = require('../../models/resume');

module.exports = async (req, res, next) => {
  const { _id } = req.user;
  try {
    const resumeList = await Resume.find()
      .select('form createdAt template')
      .where({ userId: _id });

    const resumes = resumeList.map((el) => {
      return {
        resumeId: el._id,
        title: el.form.info.title,
        createdAt: '2021.01',
        template: 'asd',
      };
    });

    res.status(200).json({
      list: resumes,
      isGetList: true,
    });
  } catch (err) {
    next(err);
  }
};
