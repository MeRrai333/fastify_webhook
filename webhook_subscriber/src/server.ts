import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { HealthResponse, HookRequest } from "./types";
import cors from '@fastify/cors';
var jwt = require('jsonwebtoken');

const PORT = 4000

interface EndpointConfig {
  path: string;
  secret: string;
}

// List of endpoints with their configurations
const endpoints: EndpointConfig[] = [
  { path: '/1', secret: 'd7fd94227f5f37c7ddec303d738e06c39866d0e2d0379d4ca53ae482aa1d3432720d4136fc6e73af3f7cd08e47014a31a0aabed49d2d1c2c46a2d55930f09d0a' },
  { path: '/2', secret: 'db2a157cca2e199256e9ca23909c55929b8d1294a38d86d3ebee15edf01d59fcc8f8c1b341c4ff8b5461b9bdcc61b7abe332cbb7d2fa63a458d08a723ba32720' },
  { path: '/test', secret: '0945d9c84e1f4b54565d087a72bd051c53517806d994f2b380b8c54988854a76b41647ee9b79b685e6ada9462f069bc5a8adc6d216a3bc1334687d8bbd7769da' },
  { path: '/mm', secret: '92c3f1553da89b50658905e7afd146a0bc81aee6d1e49ff2b4ec8fc7344f82d15501809ee01081fd0ed42ddb27398c31eddd4d35cfca2100da8094baaa5b8956' },
];

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