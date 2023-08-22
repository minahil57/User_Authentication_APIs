const{ check } = require ('express-validator');

exports.signUPValidation = [
    check('full_name','Name is required').not().isEmpty(),
    check('user_email','Please Enter A Valid Email').isEmail().normalizeEmail({gmail_remove_dots:true}),
    check('user_password', 'Password is required').isLength({ min: 6 }),
    // check('logo').custom((value,{req})=>{
    //     if(req.file.mimetype == 'logo/jpeg'||req.file.mimetype == 'logo/png'){
    //         return true;
    //     }
    //     else{
    //         return false;
    //     }

    // }).withMessage('Please Upload an image type PNG,JPG')
];
exports.loginValidation = [
    check('user_email','Please Enter A Valid Email').isEmail().normalizeEmail({gmail_remove_dots:true}),
    check('user_password', 'Password is required').isLength({ min: 6 }),
]
