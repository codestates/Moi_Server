const imageUpload = async (req, res, next) => {
  try {
    if (req.file) {
      res.status(200).json({ location: req.file.location, isUpload: true });
    } else {
      res.status(400).json({ location: '', isUpload: false });
    }
  } catch (err) {
    next(err);
  }
};

module.exports = imageUpload;
