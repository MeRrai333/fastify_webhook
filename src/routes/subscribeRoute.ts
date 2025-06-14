import { FastifyInstance, FastifyPluginOptions, FastifyRequest, FastifyReply } from 'fastify';
import { subscribeSchema } from '../schemas/subscribeSchema';
import { SubscribeRequest, ApiResponse } from '../types';
import { Prisma, PrismaClient } from '@prisma/client';
import crypto from 'crypto';

const db = new PrismaClient()

async function subscribeRoutes(
  fastify: FastifyInstance,
  options: FastifyPluginOptions
): Promise<void> {
  fastify.post<{ Body: SubscribeRequest }>(
    '/api/subscribe',
    { schema: subscribeSchema },
    async (request: FastifyRequest<{ Body: SubscribeRequest }>, reply: FastifyReply) => {
      try {
        const { url } = request.body;

        const insertData = await db.subscriber.create({
          data: {
            url,
            secret: crypto.randomBytes(64).toString('hex')
          }
        })
        
        fastify.log.info(
          insertData,
          'Insert Subscriber successful'
        )

        return reply.code(201).send({
          status: 'ok',
          data: {
            sub_id: insertData.subId,
            secret: insertData.secret
          }
        });
      } catch (error) {
        fastify.log.error(error);
        if(error instanceof Prisma.PrismaClientKnownRequestError){
          if(error.code === 'P2002') 
            return reply.code(400).send({
              status: 'failed',
              message: 'Error Duplicate'
            });
        }
        return reply.code(500).send({
          status: 'failed',
          message: 'Internal server error'
        });
      }
    }
  );

  fastify.get('/api/subscribers', async (request: FastifyRequest, reply: FastifyReply) => {
    const subscribers = await db.subscriber.findMany()

    return reply.code(200).send({
      subscribers,
      count: subscribers.length
    });

  });
}

export default subscribeRoutes;