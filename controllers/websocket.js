
const WebSocket = require('ws');
const express = require('express');
const http = require('http');
const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Import WebSocket and other necessary modules

const WebSocket = require('ws');
const { handleStatusChange } = require('../helpers/websocket_message'); // Import a function to handle status changes

// ... Other imports and setup ...
// WebSocket connections
const clients = new Set(); // Store connected clients

wss.on('connection', (ws) => {
  clients.add(ws);

  ws.on('message', (message) => {
    // Handle WebSocket messages from clients
    const data = JSON.parse(message);
    const { status, time } = data;

    // Check if the status change requires time
    const requiresTime = handleStatusChange(status);

    // Send the run time value of status and time back to the connection
    ws.send(JSON.stringify({ status, time, requiresTime }));
  });

  ws.on('close', () => {
    clients.delete(ws);
  });
});

// Implement a function to handle status changes and time requirements
const handleStatusChange = (newStatus) => {
  // Check if the status change requires time
  if (newStatus === 'accepted') {
    // If the status changes from pending to accepted, request time
    // You can implement your logic here to request time or not based on your requirements
    return true; // Time is required
  } else if (newStatus === 'prepare') {
    // If the status changes to prepare, no time is required
    return false; // Time is not required
  }
  // Handle other status changes as needed

  return false; // Default: Time is not required
};

module.exports = {
  handleWebSocketMessage,
  handleStatusChange,
  // Implement other controller functions as needed
};

