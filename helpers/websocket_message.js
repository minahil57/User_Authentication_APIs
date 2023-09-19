// When status changes in the database
const newStatus = 'accepted'; // Example new status
const changeTime = new Date(); // Example time of change

// Send the WebSocket message to all connected clients
for (const client of clients) {
  client.send(JSON.stringify({ status: newStatus, time: changeTime }));
}
