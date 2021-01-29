const Resume = require('../../models/resume');

module.exports = async (req, res, next) => {
  const { _id } = req.user;
  try {
    const resumeList = await Resume.find()
      .select('info createdAt updatedAt template')
      .where({ userId: _id });

    const resumes = resumeList.map((el) => {
      return {
        resumeId: el._id,
        title: el.info.title,
        createdAt: el.createdAt,
        updatedAt: el.updatedAt,
        template: el.template,
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
