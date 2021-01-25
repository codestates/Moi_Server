const nodemailer = require('nodemailer');

module.exports = async (req, res, next) => {
  const { email, title, desc, name } = req.body;
  if (!email || !title || !desc || !name)
    res.status(500).json({ isMailSucssessed: false });
  try {
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.GOOGLE_MAIL,
        pass: process.env.GOOGLE_PASSWORD,
      },
    });
    
    let message = {
      from: `${name}<${process.env.GOOGLE_MAIL}>`,
      to: process.env.GOOGLE_MAIL,
      subject: title,
      html: `<div><h2>${name}</h2><h3>${email}</h3>${desc}</div>`,
    };
    transporter.sendMail(message, (err) => {
      if (err) next(err);
      else res.status(200).json({ isMailSucssessed: true});
    });
  } catch (err) {
    next(err);
  }
};
