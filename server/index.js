const WebSocket = require("ws");


const wss = new WebSocket.Server({ port: 8080 });

let orders = {}; // Store orders for each table (could be replaced by a database)

// Broadcast to all clients except the sender
const broadcast = (message, sender) => {
  wss.clients.forEach((client) => {
    if (client !== sender && client.readyState === WebSocket.OPEN) {
      client.send(message);
    }
  });
};

wss.on('connection', (ws) => {
  console.log('Client connected');

  // Send current orders to the new client
  ws.send(JSON.stringify({ type: 'init', orders }));

  // Listen for messages from the client
  ws.on('message', (message) => {
    const data = JSON.parse(message);

    if (data.type === 'updateOrders') {
      // Update the orders for the current table
      orders = { ...orders, ...data.orders };
      console.log('Updated orders:', orders);

      // Broadcast the updated orders to all clients
      broadcast(JSON.stringify({ type: 'updateOrders', orders }), ws);
    }
  });

  // Handle connection close
  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

console.log('WebSocket server is running on ws://localhost:8080');