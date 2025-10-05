import express from "express";
import http from "http";
import { WebSocketServer } from "ws";
import { createClient } from "redis";

const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({ server });

// ---------- Redis setup ----------
const redis = createClient({
  username: 'default',
  password: 'WiyugE7Md49ycra5MhEyV60LOPluslII',
  socket: {
    host: '127.0.0.1',
    port: 11452,
    tls: true // important for Redis Cloud
  }
});

redis.on('error', (err) => console.error('Redis Client Error', err));
await redis.connect();

const ORDERS_KEY = "restaurant:orders";

// Helper functions
async function loadOrders() {
  const data = await redis.get(ORDERS_KEY);
  return data ? JSON.parse(data) : {};
}

async function saveOrders(orders) {
  await redis.set(ORDERS_KEY, JSON.stringify(orders));
}

// Broadcast to all connected clients
function broadcast(data) {
  wss.clients.forEach((client) => {
    if (client.readyState === 1) { // OPEN
      client.send(JSON.stringify(data));
    }
  });
}

// ---------- WebSocket setup ----------
function heartbeat() {
  this.isAlive = true;
}

wss.on("connection", async (ws) => {
  console.log("New client connected");
  ws.isAlive = true;
  ws.on("pong", heartbeat);

  // Send current orders immediately
  const orders = await loadOrders();
  ws.send(JSON.stringify({ type: "updateOrders", orders }));

  ws.on("message", async (message) => {
    let data;
    try {
      data = JSON.parse(message);
    } catch (err) {
      console.error("Invalid message received:", message);
      return;
    }

    if (data.type === "getOrders") {
      const orders = await loadOrders();
      ws.send(JSON.stringify({ type: "updateOrders", orders }));
    }

    if (data.type === "updateOrders") {
      const orders = data.orders;
      await saveOrders(orders);

      // Broadcast to all clients
      broadcast({ type: "updateOrders", orders });
    }
  });

  ws.on("close", () => console.log("Client disconnected"));
});

// Ping clients periodically
const interval = setInterval(() => {
  wss.clients.forEach((ws) => {
    if (!ws.isAlive) return ws.terminate();
    ws.isAlive = false;
    ws.ping();
  });
}, 30000);

wss.on("close", () => clearInterval(interval));

// Test route
app.get("/", (req, res) => {
  res.send("WebSocket + Redis Cloud Orders server running 🚀");
});

// Start server
const PORT = process.env.PORT || 8080;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
