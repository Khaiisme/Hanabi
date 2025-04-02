import WebSocket, { WebSocketServer } from "ws";
import express from 'express';
import http from 'http';

const app = express();

const server = http.createServer(app);
// Create an HTTP server (Render requires this)
const wss = new WebSocketServer({ server });

let orders = {}; // Stores orders

wss.on("connection", (ws) => {
  console.log("New client connected");

  ws.on("message", (message) => {
    const data = JSON.parse(message);

    if (data.type === "getOrders") {
      ws.send(JSON.stringify({ type: "updateOrders", orders }));
    }

    if (data.type === "updateOrders") {
      orders = data.orders;

      // Broadcast update to all connected clients
      wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify({ type: "updateOrders", orders }));
        }
      });
    }
  });

  ws.on("close", () => console.log("Client disconnected"));
});

// Render assigns a port dynamically, so use process.env.PORT
const PORT = process.env.PORT || 8080;
server.listen(PORT, () => console.log(`WebSocket server running on port ${PORT}`));
