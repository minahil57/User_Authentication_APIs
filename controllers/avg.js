const db = require('../config/dbconnection');

// Define the avg function
const avg = async (req, res) => {
  try {
    const restaurantId = req.params.restaurantId;
    console.log(req.params);
    // Query to calculate the average rating for the given restaurant
    const query = `
      SELECT AVG(rating) AS average_rating
      FROM review_customer
      WHERE restaurant_id = ?
    `;

    // Execute the query using db.query
    db.query(query, [restaurantId], (err, results) => {
      if (err) {
        console.error('Error calculating average rating:', err);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }

      // 'results' contains the rows retrieved from the database
      const averageRating = results[0].average_rating;
      res.json({ averageRating });
    });
  } catch (error) {
    console.error('Error calculating average rating:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Export the avg function for use in other parts of your application
module.exports = {
  avg,
};
