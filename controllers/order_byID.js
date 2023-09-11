const db = require('../config/dbconnection');
// API endpoint to fetch orders by userID
// API endpoint to fetch orders by userID
exports.getOrdersByUserId = async (req, res) => {
    const userId = req.params.userID; // Get the userID from the URL parameter
    const orderQuery = `
    SELECT
        o.order_id,
        o.user_id,
        o.total_price,
        o.status AS order_status,
        o.created_at AS order_date,
        r.resturant_name,
        mi.menu_name,
        mi.menu_image,
        oi.quantity,
        oi.item_price
    FROM
        orders o
    JOIN
        order_items oi ON o.order_id = oi.order_id
    JOIN
        restaurant r ON o.resturant_id = r.resturant_id
    JOIN
        menu mi ON oi.menu_id = mi.menu_id
    WHERE
        o.user_id = ?`;

        // Fetch order details
db.query(orderQuery, [userId], (err, orderResults) => {
    if (err) {
        return res.status(500).json({ error: 'Failed to fetch order details' });
    }

    if (orderResults.length === 0) {
        return res.status(404).json({ error: 'No orders found for this user' });
    }

    // Create an object to store the order details
    const orderDetails = {
        orders: orderResults,
    };
    console.log(res.body);
    // Return the combined order details as a JSON response
    res.status(200).json(orderDetails);
});
};

