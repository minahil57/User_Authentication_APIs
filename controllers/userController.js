const { validationResult } = require('express-validator');
//const bcrypt = require('bcryptjs');
const db = require('../config/dbconnection');
const otpGenerator = require('otp-generator');
const sendMail = require('../helpers/send_mail.js');

const register = async (req, res) => {
    var user_email = req.body.user_email;
    var user_password = req.body.user_password;
    var full_name = req.body.full_name;
    //var file_name = req.file.filename;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    //Check whether the given email already exist
    db.query(
        `SELECT * FROM user_credentials WHERE LOWER(user_email) = LOWER(${db.escape(
            user_email
        )});`,
        (err, result) => {
            if (result && result.length) {
                return res.status(409).send({
                    msg: 'This Email Address is already Registered',err,
                });
            } else {
                 db.query(
                    `INSERT INTO user_credentials 
                    (user_email, user_password, user_login_count, user_active_status) 
                    VALUES 
                    (?, ?, NULL, NULL);`,
                    [user_email, user_password],
                    (err, result) => {
                        if (err) {
                            return res.status(400).send({
                                msg: 'Data Not saved in Database'
                            });
                        }
                        // Insertion of data
                        var user_id = result.insertId;
                        db.query(
                            `INSERT INTO customer_details (full_name, user_id,created_at) 
                            VALUES (?,? NOW())`,
                            [full_name, user_id],
                            (err, result) => {
                                if (err) {
                                    return res.status(500).send({
                                        msg: 'Error inserting data into customer_details'
                                    });
                                }
                                //Successfully Inserted 
                                else {
                                    // OTP Sender
                                    let mailSubject = 'Your Wajba Account Verification Code';
                                    const otp = otpGenerator.generate(6, {
                                        digits: true,
                                        alphabets: false,
                                        upperCaseAlphabets: false,
                                        lowerCaseAlphabets: false,
                                        specialChars: false
                                    });
                                    // OTP EMAIL CONTENT
                                    let content = `<html>
                                    <head>
                                      <style>
                                        body {
                                          font-family: Arial, sans-serif;
                                          background-color: white;
                                        }
                                        .container {
                                          max-width: 600px;
                                          margin: 0 auto;
                                          padding: 20px;
                                          border: 1px solid #ddd;
                                        }
                                        .header {
                                          color: #ff8c00; /* Orange accent color */
                                          font-size: 24px;
                                          margin-bottom: 10px;
                                        }
                                        .info {
                                          font-size: 18px;
                                          margin-bottom: 15px;
                                        }
                                        .otp {
                                          font-weight: bold;
                                          font-size: 28px;
                                          color: #ff8c00; /* Orange accent color */
                                        }
                                        .footer {
                                          font-size: 14px;
                                          margin-top: 20px;
                                          color: #fff; /* White text color */
                                          background-color: #ff8c00; /* Orange accent color */
                                          padding: 10px;
                                        }
                                        .logo {
                                          display: block;
                                          margin: 0 auto;
                                          text-align: center;
                                        }
                                      </style>
                                    </head>
                                    <body>
                                      <div class="container">
                                        <div class="header">Hello, ${full_name}</div>
                                        <div class="info">
                                          We're excited to have you as part of our community. Here's your verification code:
                                        </div>
                                        <div class="otp">${otp}</div>
                                        <div class="info">
                                          Please use this code to complete your registration. If you didn't request this code, you can safely ignore this email.
                                        </div>
                                        <div class="footer">
                                          Best regards,<br />
                                          Your Wajba Team
                                        </div>
                                      </div>
                                    </body>
                                    </html>`;
                                    
                                   

                                    sendMail(user_email, mailSubject, content);
                                    //OTP Save in database
                                    db.query('UPDATE user_credentials set token=? where user_email=?', [otp, user_email], function (error, result, fields) {
                                        if (error) {
                                            return res.status(400).send({
                                                msg: err
                                            });
                                        } else {
                                            return res.status(200).send({
                                                msg: 'The User Has Been Registered'
                                            });
                                        }
                                    });
                                }
                            }
                        );
                    }
                );
            }
        }
    );
    const otpVerificationResult = await otpVerification.verifyOTP(user_email, inputOTP);
  if (otpVerificationResult.success) {
    // Update verified status or perform other actions
     db.query('UPDATE user_credentials SET user_active_status = true WHERE user_email = ?', [user_email]);
    return res.status(200).send({ msg: 'Email verified successfully' });
  } else {
    return res.status(400).send({ msg: otpVerificationResult.message });
  }
};
// const otpVerification= (req, res) => {
//   try {
//     const user_email = req.body.user_email;
//     const inputOTP = req.body.otp;
//     const query = `SELECT * FROM user_credentials WHERE token = ? AND user_email = ?`;
  
//     db.query(query, [inputOTP, user_email], (err, results) => {
//       if (err) {
//         console.error(err);
//         return res.status(500).json({ message: 'Error verifying OTP' });
//       }
  
//       if (results.length === 1) {
//         // OTP matched, update verified status or perform other actions
//         return res.json({ message: 'Email verified successfully' });
//       } else {
//         return res.status(400).json({ message: 'Invalid OTP' });
//       }
//     });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ message: 'Error verifying OTP' });
//   }
// };

module.exports = {
    register
};
