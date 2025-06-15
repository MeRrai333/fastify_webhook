import { FastifyInstance, FastifyPluginOptions, FastifyRequest, FastifyReply } from 'fastify';
import { askSchema } from '../schemas/askSchema';
import { AskRequest, ApiResponse, AskResponse, DataEntry } from '../types';
import { PrismaClient } from '@prisma/client';
import axios from 'axios';
const Redis = require("ioredis");
var jwt = require('jsonwebtoken');

const redis = new Redis(process.env.REDIS_URL);

const db = new PrismaClient()

async function askRoutes(
  fastify: FastifyInstance,
  options: FastifyPluginOptions
): Promise<void> {
  fastify.post<{ Body: AskRequest }>(
    '/api/ask',
    { schema: askSchema },
    async (request: FastifyRequest<{ Body: AskRequest }>, reply: FastifyReply) => {
      try {
        const { tx_id } = request.body;

        let message = await redis.get(`message:${tx_id}`)
        let isMatch = false

        if(message === null){
          const messageDB = await db.subscribeData.findUnique({
            where: {
              txId: tx_id
            }
          })

          if(!messageDB)
            return reply.code(404).send({
              status: 'failed',
              message: 'not found message'
            });
          console.log('Not found in Redis')
          message = messageDB.message
          await redis.setex(`message:${tx_id}`, 1, message)
          console.log('Set in Redid')
        }
        else{
          console.log('Match in Redis')
          isMatch = true
        }
        const subscribers = await db.subscriber.findMany()
        const axiosResult: {
          success: string[];
          failed: string[];
        } = {
          success: [],
          failed: []
        }

          await Promise.allSettled(
          subscribers.map(async (sub) => {
            try{
              const payload = jwt.sign(
                {
                  message: message,
                  timestamp: new Date().toISOString(),
                  isMatch
                },
                sub.secret
              )
    
              await axios.post(sub.url,
                {
                  payload
                },
                {
                headers: {
                  'Content-Type': 'application/json'
                },
                timeout: 10000
              });

              axiosResult.success.push(sub.url)
              fastify.log.info({
                url: sub.url,
                payload: payload
              }, 'Axios successful')
            }
            catch(error: any){
              axiosResult.failed.push(sub.url)
              fastify.log.error({
                url: sub.url,
                error: error.message,
                status: error.response?.status
              }, 'Axios failed')
            }
          })
        )
          
        return reply.code(200).send({
          status: 'ok',
          data: {
            message: message,
            result: axiosResult
          }
        });
      } catch (error) {
        fastify.log.error(error);
        return reply.code(500).send({
          status: 'failed',
          message: 'Internal server error'
        });
      }
    }
  );
}

export default askRoutes;