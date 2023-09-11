const express = require('express');
const router = express.Router();

const { signUPValidation} = require('../helpers/validation');
const userController = require('../controllers/userController');
const loginController = require('../controllers/login.js');
const verificationController = require('../controllers/otp.js');
const  resendController = require('../controllers/resend_otp.js');
const menu = require('../controllers/menu');
const order = require('../controllers/order');
const check_res = require('../controllers/check_restaurant');
const fetch_order = require('../controllers/order_fetch');
const orderController= require('../controllers/order_byID');
//const veriController = require('../controllers/otp');////

router.post('/register', signUPValidation, userController.register);
router.post('/verification', verificationController.otpVerification);
router.post('/login',  loginController.login);
router.post('/resendotp', resendController.resend);
router.post('/check', check_res.check);
router.get('/:restaurantName',menu.getMenusByRestaurantName );
router.post('/order' , order.placeOrder);
router.get('/fetch/:orderId', fetch_order.getOrderDetailsById);
router.get('/orders/user/:userID', orderController.getOrdersByUserId);


module.exports = router;
