import { FastifySchema } from 'fastify';

export const subscribeSchema: FastifySchema = {
    body: {
        type: 'object',
        required: ['url'],
        properties: {
            url: {
              type: 'string',
              pattern: '^https?://(localhost|127\\.0\\.0\\.1|\\[::1\\]|[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,})(:[0-9]+)?(/.*)?$'
            },
    }
  }
};