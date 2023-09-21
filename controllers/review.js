const db = require('../config/dbconnection');
const insertReview = (req,res) =>{
    const {  review_details, rating, restaurant_id, user_id } = req.body;
    const formattedRating = parseFloat(rating.toFixed(1));
    const query = `
      INSERT INTO review_customer
      ( review_details, rating, restaurant_id, user_id)
      VALUES ( ?, ?, ?, ?)
    `;
  
    const values = [ review_details, formattedRating, restaurant_id, user_id ];
  
    db.query(query, values, (err, result) => {
      if (err) {
        console.error('Error inserting review:', err);
        res.status(500).json({ error: 'Error inserting review' });
      } else {
        console.log('Review inserted successfully!');
        res.status(200).json('Review inserted successfully!' );
      }
    });
  }
  
 module.exports = {
    insertReview
 }
  