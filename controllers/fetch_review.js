// Import necessary modules and dependencies
const db = require('../config/dbconnection');

// Define the fetchReview function
const fetchReview = async (req, res) => {
  try {
    const restaurantId = req.params.restaurantId;

    // Query to fetch all ratings for the given restaurant, including user_id and user_name
    const query = `
      SELECT rc.review_id, rc.review_details, rc.rating, rc.restaurant_id, rc.user_id, cd.full_name
      FROM review_customer rc
      JOIN customer_details cd ON rc.user_id = cd.user_id
      WHERE rc.restaurant_id = ?
    `;

    // Execute the query using db.query
    db.query(query, [restaurantId], (err, results) => {
      if (err) {
        console.error('Error fetching ratings:', err);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }

      // 'results' contains the rows retrieved from the database
      res.json(results);
    });
  } catch (error) {
    console.error('Error fetching ratings:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Export the fetchReview function for use in other parts of your application
module.exports = {
  fetchReview,
};
