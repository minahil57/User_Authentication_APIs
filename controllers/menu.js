
const db = require('../config/dbconnection');
const getMenusByRestaurantId = async (req, res) => {
  var restaurantId = req.params.restaurantId;
  
  var query = `SELECT * FROM category WHERE restaurant_id = ?` ;

  try{
  db.query(query,[restaurantId],(err, result) => {
    if (err) {
      console.error('Error fetching data:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
    const responsePromises = result.map(result => {
      const categoryId = result.category_id; // Assuming the reservations have a hostel_id column
      console.log(categoryId);
      const menuQuery = 'SELECT * FROM menu WHERE category_id = ?';

      return new Promise((resolve, reject) => {
        db.query(menuQuery, [categoryId], (err, menuDetails) => {
          if (err) {
            reject(err);
            return;
          }

          if (menuDetails.length === 0) {
            // Hostel details not found, resolve with an empty object
            resolve({});
          } else {
            console.log(menuDetails);
            
            resolve({});
            // const hostelName = hostelDetails[0].hostel_name;
            // resolve({ ...reservation, hostel_name: hostelName });
          }
        });
      });
    });

    Promise.all(responsePromises)
      .then(responseData => {
        console.log('hello');
        res.status(200).json(responseData);
      })
      .catch(error => {
        console.error('Error fetching hostel details:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      });
    });
  }
     catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}


module.exports = {
  getMenusByRestaurantId,
};

