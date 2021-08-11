import { FastifyPluginCallback } from 'fastify'
import authRoute from './auth'
import userRoute from './user'

const apiRoute: FastifyPluginCallback = (fastify, opts, done) => {
  fastify.register(authRoute, { prefix: '/auth' })
  fastify.register(userRoute, { prefix: '/users' })

  done()
}

export default apiRoute
