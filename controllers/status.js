const httpServer = require('http').createServer(app);
const io = require('socket.io')(httpServer);

// Initialize WebSocket server
io.on('connection', (socket) => {
    console.log('Client connected');

    // Emit events when the order status changes to "accepted"
    // Replace this with your database monitoring logic
    // Example: When an order status changes, emit the event
    socket.on('orderAccepted', (data) => {
        socket.emit('orderAccepted', data);
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

// Start the server
const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
