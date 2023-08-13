const db = require('../config/dbconnection');

const otpVerification = {
  verifyOTP: async (user_email, inputOTP) => {
    try {
      const query = `SELECT * FROM user_credentials WHERE token = ? AND user_email = ?`;

      db.query(query, [inputOTP, user_email], (err, results) => {
        if (err) {
          console.error(err);
          return { success: false, message: 'Error verifying OTP' };
        }

        if (results.length === 1) {
          // OTP matched, update verified status or perform other actions
          return { success: true, message: 'Email verified successfully' };
        } else {
          return { success: false, message: 'Invalid OTP' };
        }
      });
    } catch (error) {
      console.error(error);
      return { success: false, message: 'Error verifying OTP' };
    }
  }
};

module.exports = otpVerification;
