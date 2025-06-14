import { FastifyInstance, FastifyPluginOptions, FastifyRequest, FastifyReply } from 'fastify';
import { unsubscribeSchema } from '../schemas/unsubscribeSchema';
import { UnsubscribeRequest, ApiResponse } from '../types';
import { PrismaClient } from '@prisma/client';
import { subscribe } from 'diagnostics_channel';

const db = new PrismaClient()

async function unsubscribeRoutes(
    fastify: FastifyInstance,
    options: FastifyPluginOptions
): Promise<void> {
    fastify.post<{ Body: UnsubscribeRequest }>(
        '/api/unsubscribe',
        { schema: unsubscribeSchema },
        async (request: FastifyRequest<{ Body: UnsubscribeRequest }>, reply: FastifyReply) => {
            try {
                const { sub_id } = request.body;

                const isExist = await db.subscriber.findUnique({
                    where: {
                        subId: sub_id
                    }
                })
                
                if (!isExist) {
                    return reply.code(404).send({
                        status: 'failed',
                        message: 'not found in subscribers'
                    });
                }
                
                await db.subscriber.delete({
                    where: {
                        subId: sub_id
                    }
                })

                fastify.log.info(
                    isExist,
                    'Delete Subscriber successful'
                )
                
                return reply.code(200).send({
                    status: 'ok',
                    subscriber: isExist
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

export default unsubscribeRoutes;
