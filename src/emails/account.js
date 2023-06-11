const nodemailer = require("nodemailer");
require("dotenv").config();
let transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL, // generated ethereal user
    pass: process.env.PASSWORD, // generated ethereal password
  },
});

const sendWelcomeEmail = async (email, name, object, text) => {
  let info = await transporter.sendMail({
    from: process.env.EMAIL, // sender address
    to: email, // list of receivers
    subject: object, // Subject line
    text: `Hello world? ${name}`, // plain text body
    html: `<b>${text} </b>`, // html body
  });
};

module.exports = {
  sendWelcomeEmail,
};
