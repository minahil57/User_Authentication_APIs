const db = require('../config/dbconnection');

exports.placeOrder = (req, res) => {
    const { user_id, cart, total_price,sub_total,resturant_id,table} = req.body;
    console.log(req.body);
  
    // Start a transactio
      // Step 1: Insert the order into the orders table
      const orderQuery = 'INSERT INTO orders (user_id, total_price,sub_total, status, created_at,resturant_id,table_no) VALUES (?, ?,?, ?, NOW(),?,?)';
      db.query(orderQuery, [user_id, total_price,sub_total, 'pending',resturant_id,table], (err, result) => {
        if (err) {
            console.log(err);
            res.status(501).json({ error: 'Data not Saved in Orders' });
        
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
                console.log(err);
                return res.status(502).json({ error: 'Data not Saved in OrdersItems' });
              }
    
              // If all queries are successful, the transaction will be automatically committed
              console.log(orderId);
              res.status(201).json({ order_id: orderId, message: 'Order placed successfully' });
            
            });
          }
          });
        }

  
// const dbPool = require('../config/dbconnection');

// exports.placeOrder = (req, res) => {
//   const { user_id, cart, total_price, resturant_id, table } = req.body;
//   console.log(req.body);

//   // Start a transaction within the connection pool
//   dbPool.getConnection((poolError, connection) => {
//     if (poolError) {
//       return res.status(500).json({ error: 'Database connection error' });
//     }

//     // Step 1: Insert the order into the orders table
//     const orderQuery =
//       'INSERT INTO orders (user_id, total_price, status, created_at, resturant_id, table_no) VALUES (?, ?, ?, NOW(), ?, ?)';
//     connection.query(
//       orderQuery,
//       [user_id, total_price, 'pending', resturant_id, table],
//       (err, result) => {
//         if (err) {
//           return res.status(501).json({ error: 'Data not Saved in Orders' });
//         }

//         const orderId = result.insertId;

//         // Step 2: Insert order items into the order_items table
//         const orderItemsQuery =
//           'INSERT INTO order_items (order_id, menu_id, quantity, item_price, suggested_changes) VALUES ?';
//         const orderItems = cart.map((item) => [
//           orderId,
//           item.dish_id,
//           item.quantity,
//           item.item_price,
//           item.suggested_changes || null,
//         ]);

        
//     );
//   });
// };
