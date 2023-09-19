const db = require('../config/dbconnection');
const FetchUserData  = (req,res) => {
    const userId = req.params.user_id; // Assuming user_id is passed as a query parameter
    console.log(req.params);
    const sql = 'SELECT * FROM user_credentials WHERE user_id = ?';
    const datasql = 'SELECT * FROM customer_details WHERE user_id = ?';
    
    // Define variables to store the results
    let userCredentialsData;
    let customerDetailsData;
    
    // Execute the query to fetch user credentials data
    db.query(sql, [userId], (err, userResults) => {
      if (err) {
        console.error('Error executing user_credentials SQL query:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        if (userResults.length === 0) {
          // User ID not found in the user_credentials table
          res.status(404).json({ error: 'User Not Found' });
        } else {
          // Store the user credentials data
          userCredentialsData = userResults[0]; // Assuming you expect only one result
    
          // Execute the query to fetch customer details data
          db.query(datasql, [userId], (err, customerResults) => {
            if (err) {
              console.error('Error executing customer_details SQL query:', err);
              res.status(500).json({ error: 'Internal Server Error' });
            } else {
              // Store the customer details data
              customerDetailsData = customerResults[0]; // Assuming you expect only one result
    
              // Extract only the desired fields
              const responseData = {
                full_name: customerDetailsData.full_name,
                user_email: userCredentialsData.user_email,
              };
    
              // Send the extracted data as a JSON response
              res.status(200).json(responseData);
            }
          });
        }
      }
    });
}
module.exports={
    FetchUserData
}