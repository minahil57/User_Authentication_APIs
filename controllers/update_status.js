const db = require('../config/dbconnection');

// Update order status by order ID
//app.put('/updateOrderStatus/:orderId',
exports. update_status = (req, res) => {
  const orderId = req.params.orderId;
  const newStatus = req.body.status; // Assuming you send the new status in the request body
  console.log(req.params);
  const updateQuery = 'UPDATE orders SET status = ? WHERE order_id = ?';

  db.query(updateQuery, [newStatus, orderId], (err, result) => {
    if (err) {
      console.error('Error updating order status: ' + err.message);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      if (result.affectedRows === 0) {
        res.status(404).json({ error: 'Order not found' });
      } else {
        res.status(200).json({ message: 'Order status updated successfully' });
      }
    }
  });
}

