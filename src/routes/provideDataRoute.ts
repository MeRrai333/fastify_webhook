import { FastifyInstance, FastifyPluginOptions, FastifyRequest, FastifyReply } from 'fastify';
import { provideDataSchema } from '../schemas/provideDataSchema';
import { ProvideDataRequest, ApiResponse, DataEntry } from '../types';
import { PrismaClient } from '@prisma/client';

const db = new PrismaClient()

async function provideDataRoutes(
  fastify: FastifyInstance,
  options: FastifyPluginOptions
): Promise<void> {
  fastify.post<{ Body: ProvideDataRequest }>(
    '/api/provide_data',
    { schema: provideDataSchema },
    async (request: FastifyRequest<{ Body: ProvideDataRequest }>, reply: FastifyReply) => {
      try {
        const { message } = request.body;

        if(message === '')
          return reply.code(400).send({
            status: 'failed',
            message: '"message" is empty'
          });


        const insertData = await db.subscribeData.create({
          data: {
            message
          }
        })

        fastify.log.info(
          insertData,
          'Insert Provide data successful'
        )
        
        return reply.code(201).send({
          status: 'ok',
          provideData: insertData
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

  // Get stored data (for testing)
  fastify.get('/api/provide_data', async (request: FastifyRequest, reply: FastifyReply) => {
    
    const subscribeDatas = await db.subscribeData.findMany()

    return {
      subscribeDatas,
      count: subscribeDatas.length
    };
  });
}

export default provideDataRoutes;