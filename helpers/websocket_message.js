// // When status changes in the database
// const newStatus = 'accepted'; // Example new status
// const changeTime = new Date(); // Example time of change

// // Send the WebSocket message to all connected clients
// for (const client of clients) {
//   client.send(JSON.stringify({ status: newStatus, time: changeTime }));
// }
const http = require('http');
const socketIo = require('socket.io');

const server = http.createServer();
const io = socketIo(server);

// Handle WebSocket connections and events here

io.on('connection', (socket) => {
  console.log('A client connected');

  // Example: Send order status update
  socket.emit('orderStatus', { orderId: 123, status: 'Pending' });

  // Handle incoming messages from clients
  socket.on('message', (data) => {
    // Process incoming messages
  });

  // Handle disconnect
  socket.on('disconnect', () => {
    console.log('A client disconnected');
  });
});
