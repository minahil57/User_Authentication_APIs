
const bcrypt = require('bcryptjs');
const db = require('../config/dbconnection');
const { param } = require('express-validator');

// Middleware for parsing JSON requests
// Endpoint to change the user's password
 
const changepassword = async (req, res) => {
  const userId = parseInt(req.params.id);
  const { oldPassword, newPassword } = req.body;
  console.log(req.body);
  console.log(req.params);

  // Find the user by ID
  const query = 'SELECT user_id, user_password FROM user_credentials WHERE user_id = ?';
  db.query(query, [userId], async (err, row) => {
    if (err) {
        console.log(err);
      return res.status(500).json({ message: 'Database error' });
    }

    if (!row) {
      return res.status(404).json({ message: 'User not found' });
    }
    console.log(row);
    if (Array.isArray(row) && row.length > 0) {
        // Access the first element of the array and then the user_password property
        const userPassword = row[0].user_password;

    // Check if the old password is correct using bcrypt
    const passwordMatch = await bcrypt.compare(oldPassword,userPassword);

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Old password is incorrect' });
    }

    // Hash and update the new password
    const saltRounds = 10;
    const newPasswordHash = await bcrypt.hash(newPassword, saltRounds);

    // Update the password in the database
    const updateQuery = 'UPDATE user_credentials SET user_password = ? WHERE user_id = ?';
    db.query(updateQuery, [newPasswordHash, userId], (updateErr) => {
      if (updateErr) {
        
        return res.status(500).json({ message: 'Database error' });
      }

      return res.status(200).json({ message: 'Password changed successfully' });
    });
}
  });
}
 module.exports = {
    changepassword,
 }
