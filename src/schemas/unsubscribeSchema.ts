import { FastifySchema } from 'fastify';

export const unsubscribeSchema: FastifySchema = {
    body: {
        type: 'object',
        required: ['sub_id'],
        properties: {
            sub_id: { type: 'number' }
        }
    }
};