
const db = require('../config/dbconnection');
// const getMenusByRestaurantName = async (req, res) => {
//   const restaurantName = req.params.restaurantName;
//   console.log(req.body);
//   const restaurantQuery = 'SELECT * FROM restaurant WHERE resturant_name = ?';
//   const categoryQuery = 'SELECT * FROM category WHERE restaurant_id = ?';
//   const menuQuery = 'SELECT * FROM menu WHERE category_id = ?';

//   try {
//     db.query(restaurantQuery, [restaurantName], (err, restaurant) => {
//       if (err) {
//         console.error('Error fetching restaurant:', err);
//         res.status(500).json({ error: 'Internal Server Error' });
//         return;
//       }

//       if (restaurant.length === 0) {
//         res.status(404).json({ message: 'Restaurant not found' });
//         return;
//       }

//       var restaurantId = restaurant[0].resturant_id;
//       console.log(restaurantId);

//       db.query(categoryQuery, [restaurantId], (err, categories) => {
//         if (err) {
//           console.error('Error fetching categories:', err);
//           res.status(500).json({ error: 'Internal Server Error' });
//           return;
//         }

//         if (categories.length === 0) {
//           res.status(404).json({ message: 'No categories found for the given restaurant' });
//           return;
//         }

//         const responsePromises = categories.map(category => {
//           const categoryId = category.category_id;

//           return new Promise((resolve, reject) => {
//             db.query(menuQuery, [categoryId], (err, menuDetails) => {
//               if (err) {
//                 reject(err);
//                 return;
//               }

//               const categoryWithMenu = {
//                 ...category,
//                 menu: menuDetails.map(menuItem => {
//                   return {
//                     ...menuItem,
//                     menu_image: menuItem.menu_image.toString('base64') // Convert BLOB to base64
//                   };
//                 })
//               };
//               console.log(categoryWithMenu);

//               resolve(categoryWithMenu);
//             });
//           });
//         });

//         Promise.all(responsePromises)
//           .then(result => {
//             if (result.length === 0) {
//               res.status(404).json({ message: 'No menu items found for the given categories' });
//             } else {
//               res.status(200).json(result);
//             }
//           })
//           .catch(error => {
//             console.error('Error fetching menu details:', error);
//             res.status(500).json({ error: 'Internal Server Error' });
//           });
//       });
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// };

const getMenusByRestaurantName = async (req, res) => {
  const restaurantName = req.params.restaurantName;
  console.log(req.body);
  const restaurantQuery = 'SELECT * FROM restaurant WHERE resturant_name = ?';
  const categoryQuery = 'SELECT * FROM category WHERE restaurant_id = ?';
  const menuQuery = 'SELECT * FROM menu WHERE category_id = ?';

  try {
    db.query(restaurantQuery, [restaurantName], (err, restaurant) => {
      if (err) {
        console.error('Error fetching restaurant:', err);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }

      if (restaurant.length === 0) {
        res.status(404).json({ message: 'Restaurant not found' });
        return;
      }

      var restaurantId = restaurant[0].resturant_id;
      console.log(restaurantId);

      db.query(categoryQuery, [restaurantId], (err, categories) => {
        if (err) {
          console.error('Error fetching categories:', err);
          res.status(500).json({ error: 'Internal Server Error' });
          return;
        }

        if (categories.length === 0) {
          res.status(404).json({ message: 'No categories found for the given restaurant' });
          return;
        }

        const responsePromises = categories.map(category => {
          const categoryId = category.category_id;
          
          return new Promise((resolve, reject) => {
            db.query(menuQuery, [categoryId], (err, menuDetails) => {
              if (err) {
                reject(err);
                return;
              }
              
              const categoryWithMenu = {
                ...category,
                menu: menuDetails
              };
              console.log(categoryWithMenu);
              
              resolve(categoryWithMenu);
            });
          });
        });

        Promise.all(responsePromises)
          .then(result => {
            if (result.length === 0) {
              res.status(404).json({ message: 'No menu items found for the given categories' });
            } else {
              res.status(200).json(result);
            }
          })
          .catch(error => {
            console.error('Error fetching menu details:', error);
            res.status(500).json({ error: 'Internal Server Error' });
          });
      });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = {
  getMenusByRestaurantName,
};