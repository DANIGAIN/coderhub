const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, 
  auth: {
    user: process.env.GMAIL,
    pass: process.env.APP_PASSWORD,
  },
});


export async function sendEmail(receiver , type , subject , html) {
  
  const info = await transporter.sendMail({
    from: process.env.GMAIL, 
    to: receiver,
    subject, 
    text: "Hey ! please click the link for verify your application ", 
    html, 
  });

  console.log("Message sent: %s", info.messageId);
}



