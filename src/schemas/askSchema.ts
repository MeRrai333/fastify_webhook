import { FastifySchema } from 'fastify';

export const askSchema: FastifySchema = {
    body: {
        type: 'object',
        required: ['tx_id'],
        properties: {
            tx_id: { type: 'number' },
        }
    }
};