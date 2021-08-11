import { FastifyPluginCallback } from 'fastify'
import { StatusCodes } from 'http-status-codes'
import authController from 'controllers/AuthController'

const authRoute: FastifyPluginCallback = (fastify, opts, done) => {
  fastify.post('/logout', (request, reply) => {
    reply
      .clearCookie('access_token')
      .clearCookie('refresh_token')
      .status(StatusCodes.OK)
  })

  fastify.post(
    '/signin',
    {
      schema: {
        body: {
          type: 'object',
          required: ['email', 'password'],
          properties: {
            email: { type: 'string' },
            password: { type: 'string' },
          },
        },
      },
    },
    authController.login
  )

  fastify.post(
    '/signup',
    {
      schema: {
        body: {
          type: 'object',
          required: ['email', 'password', 'username'],
          properties: {
            email: { type: 'string' },
            password: { type: 'string' },
            username: { type: 'string' },
            gender: {
              type: 'string',
              enum: ['M', 'F'],
            },
            birthday: { type: 'number' },
          },
        },
      },
    },
    authController.signup
  )

  done()
}

export default authRoute
