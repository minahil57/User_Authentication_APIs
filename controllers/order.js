const db = require('../config/dbconnection');

exports.placeOrder = (req, res) => {
    const { user_id, cart, total_price , resturant_id } = req.body;
    console.log(req.body);
  
    // Start a transaction
    db.beginTransaction((err) => {
      if (err) {
        return res.status(500).json({ error: 'Transaction error' });
      }
  
      // Step 1: Insert the order into the orders table
      const orderQuery = 'INSERT INTO orders (user_id, total_price, status, created_at,resturant_id) VALUES (?, ?, ?, NOW(),?)';
      db.query(orderQuery, [user_id, total_price, 'pending',resturant_id], (err, result) => {
        if (err) {
          db.rollback(() => {
            res.status(500).json({ error: 'Data not Saved in Orders' });
          });
        } else {
          const orderId = result.insertId;
  
          // Step 2: Insert order items into the order_items table
          const orderItemsQuery = 'INSERT INTO order_items (order_id, menu_id, quantity, item_price, suggested_changes) VALUES ?';
          const orderItems = cart.map((item) => [
            orderId,
            item.dish_id,
            item.quantity,
            item.item_price,
            item.suggested_changes || null,
          ]);
  
          db.query(orderItemsQuery, [orderItems], (err) => {
            if (err) {
              db.rollback(() => {
                console.log(err);
                res.status(500).json({ error: 'Data not Saved in OrdersItems' });
              });
            } else {
              // If all queries are successful, commit the transaction
              db.commit((err) => {
                if (err) {
                  db.rollback(() => {
                    console.log(err);
                    res.status(500).json({ error: 'Order placement failed' });
                  });
                } else {
                  res.status(201).json({ message: 'Order placed successfully' });
                  console.log(res.body);
                }
              });
            }
          });
        }
      });
    });
  };
  
