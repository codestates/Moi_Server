const nodemailer = require('nodemailer');

module.exports = async (req, res, next) => {
  const { email, title, desc, username } = req.body;
  if (!email || !title || !desc || !username)
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
      from: `${username}<${process.env.GOOGLE_MAIL}>`,
      to: process.env.GOOGLE_MAIL,
      subject: title,
      html: `<div 
      style='
      text-align: center; 
      width: 50%; 
      height: 60%;
      margin: 15%;
      padding: 20px;
      border: 1px solid #999;
      '>
      <h2>${username} 님의 메일입니다.</h2> <br/> <h2>제목: ${title}</h2> <br/>${desc} <br/><br/><br/><br/><br/><br/>모두의 이력서-Moi 2021 © everymoi.com </div> <h3>Contact : ${email}</h3><br/><br/> `,
    };
    transporter.sendMail(message, (err) => {
      if (err) next(err);
      else res.status(200).json({ isMailSucssessed: true });
    });
  } catch (err) {
    next(err);
  }
};
