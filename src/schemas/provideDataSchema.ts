import { FastifySchema } from 'fastify';

export const provideDataSchema: FastifySchema = {
    body: {
        type: 'object',
        required: ['message'],
        properties: {
            message: { type: 'string' },
        }
    }
};