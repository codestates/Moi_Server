const { s3 } = require('../../lib/multerMiddleware');

const deleteImage = (req, res, next) => {
  const { location } = req.body;
  if (location) {
    const splitLocation = location.split('/');
    const fileName = splitLocation[splitLocation.length - 1];
    const param = {
      Bucket: 'moi-profile',
      Key: fileName,
    };
    s3.deleteObject(param, (err) => {
      if (err) return next(err);
      res.status(200).json({ location: '', isDeleted: true });
    });
  }
};

module.exports = deleteImage;
