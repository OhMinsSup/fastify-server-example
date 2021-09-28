import { FastifyPluginCallback } from 'fastify'
import authorized from 'plugins/authorized'
import pickController from 'controllers/PickController'

const pickRoutes: FastifyPluginCallback = (fastify, opts, done) => {
  fastify.get('/', async (request, reply) => {
    reply.status(200).send({
      message: 'Hello World! GET',
    })
  })

  fastify.register(privatePickRoutes, { prefix: '' })

  done()
}

const privatePickRoutes: FastifyPluginCallback = (fastify, opts, done) => {
  fastify.register(authorized)

  fastify.post('/', pickController.createPick)

  done()
}

export default pickRoutes
