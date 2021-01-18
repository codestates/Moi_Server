const { deleteProfiles } = require('../../lib/multerMiddleware');

const deleteImage = async (req, res, next) => {
  const { location } = req.body;
  try {
    if (location) {
      await deleteProfiles(location);
      res.status(200).json({ location: '', isDeleted: true });
    } else {
      const err = new Error('is Deleted False');
      err.status = 400;
      next(err);
    }
  } catch (err) {
    next(err);
  }
};

module.exports = deleteImage;
