import { FastifyPluginCallback } from 'fastify'
import userController from 'controllers/UserController'

const userRoutes: FastifyPluginCallback = (fastify, opt, done) => {
  fastify.get(
    '/',
    {
      schema: {
        querystring: {
          title: 'Get Users Querystring',
          type: 'object',
          properties: {
            pageNo: { type: 'number' },
            limit: { type: 'number' },
          },
        },
      },
    },
    userController.list
  )

  done()
}

export default userRoutes
