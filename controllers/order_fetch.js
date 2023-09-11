const db = require('../config/dbconnection');

// API endpoint to fetch order details by order ID
exports.getOrderDetailsById = async (req, res) => {
    const orderId = req.params.orderId; // Get the order ID from the URL parameter

//     try {
//         const orderQuery = 'SELECT * FROM orders WHERE order_id = ?';
//         const orderItemsQuery = 'SELECT * FROM order_items WHERE order_id = ?';
//         const menuQuery = 'SELECT * FROM menu WHERE menu_id IN (?)';

//         // Create an object to store the order details
//         const orderDetails = {};

//         // Fetch order details
//         db.query(orderQuery, [orderId], (err, orderResults) => {
//             if (err) {
//                 return res.status(500).json({ error: 'Failed to fetch order details' });
//             }

//             if (orderResults.length === 0) {
//                 return res.status(404).json({ error: 'Order not found' });
//             }

//             orderDetails.order = orderResults[0];
//             console.log(orderDetails.order);

//             // Fetch order items
//             db.query(orderItemsQuery, [orderId], (err, orderItemsResults) => {
//                 if (err) {
//                     return res.status(500).json({ error: 'Failed to fetch order items' });
//                 }

//                 orderDetails.order_items = orderItemsResults;
//                 console.log(orderDetails.order_items);

//                 // Extract menu IDs from order items
//                 const menuIds = orderItemsResults.map(item => item.menu_id);

//                 if (!Array.isArray(menuIds) || menuIds.some(id => typeof id !== 'number')) {
//                     return res.status(400).json({ error: 'Invalid menu_ids provided' });
//                 }

//                 // Fetch menu details for the extracted menu IDs
//                 db.query(menuQuery, [menuIds], (err, menuResults) => {
//                     if (err) {
//                         return res.status(500).json({ error: 'Failed to fetch menu details' });
//                     }

//                     // Store menu details in orderDetails
//                     orderDetails.menu_details = menuResults;

//                     // Return the combined order details as a JSON response
//                     res.status(200).json(orderDetails);
//                 });
//             });
//         });
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// };




    // // Query to fetch order details for the specified order ID
    const query = `
    SELECT
        oi.quantity,
        d.menu_name,
        d.menu_price,
        o.status AS order_status,
        o.created_at AS time_preparation
    FROM
        orders o
    JOIN
        order_items oi ON o.order_id = oi.order_id
    JOIN
        menu d ON oi.menu_id = d.menu_id
    WHERE
        o.order_id = ?
    `;


    db.query(query, [orderId], (err, results) => {
        console.log('SQL Query:', query);
        if (err) {
            console.log(err);
            return res.status(500).json({ error: 'Failed to fetch order details 1' });
        }
    
        if (results.length === 0) {
            return res.status(404).json({ error: 'Order not found' });
        }
    
        // Initialize an array to store order items
        const orderItems = results.map(row => ({
            menu_name: row.menu_name,
            quantity: row.quantity,
            menu_price: row.menu_price,
            order_status: row.order_status,
            time_preparation: row.time_preparation,
        }));
    
        // Create a response object
        const response = {
            order_id: results[0].order_id,
            user_id: results[0].user_id,
            total_price: results[0].total_price,
            order_items: orderItems,
        };
    
        res.status(200).json(response);
    });
    
}
