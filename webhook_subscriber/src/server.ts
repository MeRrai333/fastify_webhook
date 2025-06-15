import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { HealthResponse, HookRequest } from "./types";
import cors from '@fastify/cors';
import { EndpointConfig, endpoints } from "./config";
var jwt = require('jsonwebtoken');

const PORT = 4000

// server.js - Main server file
const fastify = require('fastify')({ logger: true });


// Health check endpoint
fastify.get('/health', async (request: FastifyRequest, reply: FastifyReply<{ Reply: HealthResponse }>) => {
  return {
    status: 'healthy',
    message: 'This is Webhook receiver side',
    timestamp: new Date().toISOString()
  };
});

// Start the server
const start = async () => {
  try {
    await fastify.register(cors, {
      origin: true  // This allows all origins (same as origin: "*")
    });
    await fastify.listen({ port: PORT, host: '0.0.0.0' });
    console.log(`Server listening on http://localhost:${PORT}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

export const createPostRoutes = (fastify: FastifyInstance, configs: EndpointConfig[]) => {
  configs.forEach(config => {
    fastify.post<
      {Body: HookRequest}
    >(
      config.path,
      async (request: FastifyRequest< {Body: HookRequest} >, reply: FastifyReply) => {
        try{
          const {payload} = request.body;

          const decode = jwt.verify(
            payload,
            config.secret
          )

          console.group(`----- Path ${config.path} -----`)
          console.log(`Raw: ${payload}`)
          console.log(
            decode.isMatch
              ? "Match in Redis!!"
              : "Not match in Redis, From DB!!"
          )
          console.log(`Messsage from jwt decode: '${decode.message}'`)
          console.log(`Timestamp: ${decode.timestamp}`)
          console.groupEnd()

          return reply.code(200).send({
            status: 'ok',
            result: decode
          })
        }
        catch(error: any){
          fastify.log.error(error);
          if (error.name === 'JsonWebTokenError'){
            console.error('===== JWT token is invalid =====')
            return reply.code(400).send({
              status: 'failed',
              message: 'JWT token is invalid'
            });
          }
          return reply.code(500).send({
            status: 'failed',
            message: 'Internal server error'
          });
        }
    });
  });
};

createPostRoutes(fastify, endpoints)

start();