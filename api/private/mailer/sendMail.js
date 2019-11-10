const mailRouter = require('express').Router()
const nodemailer = require('nodemailer');

const mailUser = process.env.MAIL_SERVER
const mailPass = process.env.MAIL_PASS

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: mailUser,
      pass: mailPass
    }
  });
  
const mailOptions = {
    from: 'rjordan1352refresh-yo.com',
    to: 'rjordan1352@gmail.com',
    subject: 'Sending Email using Node.js',
    text: 'That was easy!'
};
  
mailRouter.get('/',(req,res)=>{
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
          res.status(500).json({message:'Message Was Not Sent'});
        } else {
          res.status(200).json({message:'Your Message was sent and should arrive shortly'});
        }
    });
})



module.exports=mailRouter