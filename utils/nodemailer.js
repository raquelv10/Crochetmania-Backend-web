// nodemailer 
import nodemailer from 'nodemailer';

const nodeMailer = (from, to, subject, html) => {
  return new Promise((resolve, reject) => {

    let transporter = nodemailer.createTransport({
      service: 'hotmail',
        auth: {
        user: 'crochetmania-bcn@outlook.es',
        pass: 'netmind22'
      }
    });

    const mailOptions = {
      from: from,
      to: to,
      subject: subject,
      html: html
    };

    transporter.sendMail(mailOptions, (error, info ) => {
      if (error) {
        resolve(false);
      } else {
        resolve(true);
      }
    });
  });
}

export default nodeMailer; 