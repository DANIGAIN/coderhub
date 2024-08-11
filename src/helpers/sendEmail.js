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
  if(type === 'varify'){
     await transporter.sendMail({
      from: process.env.GMAIL, 
      to: receiver,
      subject, 
      text: "Hey ! please click the link for verify your application ", 
      html, 
    });
    console.log("email is send successfully")
  }else{
    const info = await transporter.sendMail({
      from: process.env.GMAIL, 
      to: receiver,
      subject, 
      text: "Hey ! please click the link for forgot  your password ", 
      html, 
    });
    console.log("Message sent: %s", info.messageId); 

  }
  

}



