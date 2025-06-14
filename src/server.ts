import { FastifyReply, FastifyRequest } from "fastify";
import { HealthResponse } from "./types";

const PORT = 3000

// server.js - Main server file
const fastify = require('fastify')({ logger: true });

// Import route handlers
const subscribeRoutes = require('./routes/subscribeRoute');
const unsubscribeRoutes = require('./routes/unsubscribeRoute');
const provideDataRoutes = require('./routes/provideDataRoute');
const askRoutes = require('./routes/askRoute');

// Register routes
fastify.register(subscribeRoutes);
fastify.register(unsubscribeRoutes);
fastify.register(provideDataRoutes);
fastify.register(askRoutes);

// Health check endpoint
fastify.get('/health', async (request: FastifyRequest, reply: FastifyReply<{ Reply: HealthResponse }>) => {
  return {
    status: 'healthy',
    message: 'This is Webhook Sender side',
    timestamp: new Date().toISOString(),
  };
});

// Start the server
const start = async () => {
  try {
    await fastify.listen({ port: PORT, host: '0.0.0.0' });
    console.log(`Server listening on http://localhost:${PORT}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();