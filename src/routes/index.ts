import { FastifyPluginCallback } from 'fastify'
import authRoute from './auth'
// import userRoute from './api/user'
// import pickRoute from './api/pick'

const apiRoute: FastifyPluginCallback = (fastify, opts, done) => {
  fastify.register(authRoute, { prefix: '/auth' })
  // fastify.register(userRoute, { prefix: '/users' })
  // fastify.register(pickRoute, { prefix: '/picks' })
  done()
}

export default apiRoute
