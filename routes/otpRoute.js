const express = require('express');
const verify_user = express.Router();

const otpVerificationController = require('../controllers/otp_verification');

verify_user.post('/verification', otpVerificationController.otpVerification);
module.exports = {
    verify_user
    };