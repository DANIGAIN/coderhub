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
    await new Promise((resolve, reject) => {
    transporter.sendMail({
      from: process.env.GMAIL, 
      to: receiver,
      subject, 
      text: "Hey ! please click the link for verify your application ", 
      html, 
    },(error, info) => {
      if(error){
        console.log(error);
            reject(error);
      }else{
        console.log(info);
        resolve(info);
      }
    })
    
  });
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



