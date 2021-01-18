const multer = require('multer');
const multerS3 = require('multer-s3');
const aws = require('aws-sdk');

const s3 = new aws.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  region: process.env.AWS_REGION,
});

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'moi-profile',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: 'public-read',
    metadata: (req, file, cb) => {
      cb(null, { fieldName: file.fieldname });
    },
    key: (req, file, cb) => {
      const ext = file.originalname;
      cb(null, `${Date.now().toString()}-${ext}`);
    },
  }),
});

const deleteProfiles = async (location) => {
  const splitLocation = location.split('/');
  const fileName = splitLocation[splitLocation.length - 1];
  const param = {
    Bucket: 'moi-profile',
    Key: fileName,
  };
  await s3.deleteObject(param, (err) => {
    if (err) return err;
  });
};

module.exports = { s3, upload, deleteProfiles };
