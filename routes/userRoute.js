const express = require('express');
const router = express.Router();

// const path = require('path');
// const multer = require('multer');
// const storage = multer.diskStorage({
//     destination:function(req,file,cb){
//         cb(null,path.join(path.dirname,'../public/images'));

//     },
//     filename:function(req,file,cb){
//         const name = Date.now()+'-'+file.originalname;
//         cb(null,name);

//     }

// });
// const filefilter = (req,file,cb)=>{
//     (file.mimetype == 'image/jpeg' || file.mimetype == 'image/jpeg'  )? 
//     cb(null,true):cb(null,false);
// }

// const upload = multer({
//     storage : storage,
//     fileFilter:filefilter
// }); 
const {signUPValidation,loginValidation} = require('../helpers/validation');
const userController = require('../controllers/userController');
// const { dir } = require('console');

//const otpVerificationController = require('../controllers/otp_verification');


// router.post('/register',//upload.single('logo')
// ,signUPValidation,userController.register);
router.post('/register',signUPValidation,userController.register);
router.post('/verification',userController.otpVerification);
router.post('/login', loginValidation, userController.login);

module.exports = router;

