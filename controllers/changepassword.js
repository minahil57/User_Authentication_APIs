
const bcrypt = require('bcrypt');


const db = require('../config/dbconnection');

// Middleware for parsing JSON requests
// Endpoint to change the user's password
// app.put('/api/change-password/:id', 
const changepassword = async (req, res) => {
  const userId = parseInt(req.params.id);
  const { oldPassword, newPassword } = req.body;

  // Find the user by ID
  const query = 'SELECT user_id, user_password FROM user_credentials WHERE id = ?';
  db.get(query, [userId], async (err, row) => {
    if (err) {
      return res.status(500).json({ message: 'Database error' });
    }

    if (!row) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if the old password is correct using bcrypt
    const passwordMatch = await bcrypt.compare(oldPassword, row.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Old password is incorrect' });
    }

    // Hash and update the new password
    const saltRounds = 10;
    const newPasswordHash = await bcrypt.hash(newPassword, saltRounds);

    // Update the password in the database
    const updateQuery = 'UPDATE user_credentials SET user_password = ? WHERE id = ?';
    db.run(updateQuery, [newPasswordHash, userId], (updateErr) => {
      if (updateErr) {
        return res.status(500).json({ message: 'Database error' });
      }

      return res.status(200).json({ message: 'Password changed successfully' });
    });
  });
}
 module.exports = {
    changepassword,
 }
