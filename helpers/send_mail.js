const nodemailer = require('nodemailer');
require('dotenv').config();
const {SMTP_MAIL , SMTP_PASSWORD} = process.env;

const sendMail = async(user_email , mailSubject , content) =>{

    try {
        const transport = nodemailer.createTransport({
            host       : 'smtp.gmail.com',
            port       : 587,
            secure     : false,
            requireTLS : true,
            auth:{
                user   : SMTP_MAIL,
                pass   : SMTP_PASSWORD
            }
        });
        const mailOptions = {
            from:SMTP_MAIL,
            to:user_email,
            subject: mailSubject,
            html:content
        }
        
        transport.sendMail(mailOptions,function(error,info){
            if(error){
                return res.status(400).send({
                    msg: err
                });
            }
            else{
                console.log('Mail sent successfully!',info.response);
                return res.status(200).send({
                    msg: 'Mail sent successfully!'
                });
            }

        });
    } catch (error) {

        console.log(error.message);
        
    }
    
}
module.exports = sendMail;