const express = require('express');
const router = express.Router();

const { signUPValidation, loginValidation } = require('../helpers/validation');
const userController = require('../controllers/userController');
//const { Menu } = require('../controllers/menu');
const { Menu, Category, Branch } = require('../controllers/menu'); // Import the Menu model here

const menu = require('../controllers/menu');

router.post('/register', signUPValidation, userController.register);
router.post('/verification', userController.otpVerification);
router.post('/login', loginValidation, userController.login);
router.post('/resendotp', userController.resend);

router.get('/:restaurantId',menu.getMenusByRestaurantId );
// => {
//   const restaurantId = req.params.restaurantId;

//   try {
//     console.log('Restaurant ID:', restaurantId);
//     console.log('Before query');
//     console.log(Menu);

//     const menus = await Menu.findAll({
//       include: [
//         {
//           model: Category,
//           include: {
//             model: Branch,
//             where: { resturant_id: restaurantId }, // Adjust the field name as per your model
//           },
//         },
//       ],
//     });

//     console.log('After query');
//     console.log('Fetched Menus:', menus);

//     if (menus.length === 0) {
//       return res.status(404).json({ message: 'No menu data available for this restaurant.' });
//     }

//     res.json(menus);
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

module.exports = router;
