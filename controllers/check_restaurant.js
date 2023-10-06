const db = require('../config/dbconnection');

const check = async (req, res) => {
  const { restaurantName } = req.body;
  console.log(req.body);

  // SQL query to check if the restaurant name exists in the database
  const query = `SELECT * FROM restaurant WHERE resturant_name = ?`;

  db.query(query, [restaurantName], (error, results) => {
    if (error) {
      console.error('Error executing query:', error);
      res.status(500).json({ success: false, message: 'Error checking restaurant name' });
      return;
    }

    if (results.length > 0) {
      const restaurant = results[0]; // Assuming only one restaurant with this name exists
      res.status(200).json({ success: true, message: 'Restaurant found', restaurant });
    } else {
      res.status(400).json({ success: false, message: 'Restaurant not found' });
    }
  });
};

module.exports = {
  check,
};
