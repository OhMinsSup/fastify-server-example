import { FastifyPluginCallback } from 'fastify'
import authRoute from './auth'
import pickRoutes from './pick'
import userRoute from './user'

const apiRoute: FastifyPluginCallback = (fastify, opts, done) => {
  fastify.register(authRoute, { prefix: '/auth' })
  fastify.register(userRoute, { prefix: '/users' })
  fastify.register(pickRoutes, { prefix: '/picks' })

  done()
}

export default apiRoute
