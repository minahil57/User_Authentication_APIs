const db = require('../config/dbconnection');

// API endpoint to fetch order details by order ID
exports.getOrderDetailsById = async (req, res) => {
    const orderId = req.params.orderId; // Get the order ID from the URL parameter
    const query = `
    SELECT
        oi.quantity,
        d.menu_name,
        d.menu_price,
        o.status AS order_status,
        o.created_at AS time_preparation,
        o.total_price,
        o.sub_total
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
        //console.log('SQL Query:', query);
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
            order_id: orderId,
            user_id: results[0].user_id,
            total_price: results[0].total_price,
            sub_total: results[0].sub_total,
            order_items: orderItems,
        };
        console.log(response);
        res.status(200).json(response);
    });
    
}
// exports.getOrderDetailsById = async (req, res) => {
//     const orderId = req.params.orderId; // Get the order ID from the URL parameter
//     console.log(req.params);
//     const query = `
//     SELECT
//         oi.quantity,
//         d.menu_name,
//         d.menu_price,
//         o.status AS order_status,
//         o.created_at AS time_preparation,
//         o.total_price,
//         o.sub_total
//     FROM
//         orders o
//     JOIN
//         order_items oi ON o.order_id = oi.order_id
//     JOIN
//         menu d ON oi.menu_id = d.menu_id
//     WHERE
//         o.order_id = ?
//     `;

//     db.query(query, [orderId], (err, results) => {
//         //console.log('SQL Query:', query);
//         if (err) {
//             console.log(err);
//             return res.status(500).json({ error: 'Failed to fetch order details 1' });
//         }
//         console.log(results);

//         if (results.length === 0) {
//             console.log(results.length);
//             return res.status(404).json({ error: 'Order not found' });
//         }

//         // Initialize an array to store order items
//         const orderItems = results.map(row => ({
//             menu_name: row.menu_name,
//             quantity: row.quantity,
//             menu_price: row.menu_price,
//             order_status: row.order_status,
//             time_preparation: row.time_preparation,
//         }));

//         // Create a response object
//         const response = {
//             order_id: results[0].order_id,
//             user_id: results[0].user_id,
//             total_price: results[0].total_price,
//             sub_total: results[0].sub_total,
//             order_items: orderItems,
//         };

//         res.status(200).json(response);
//     });
// }
