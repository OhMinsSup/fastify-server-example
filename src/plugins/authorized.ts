import { DI } from 'app'
import { RESULT_CODE } from 'constants/constant'
import { FastifyPluginAsync } from 'fastify'
import fp from 'fastify-plugin'
import { User } from '../entities'

declare module 'fastify' {
  interface FastifyRequest {
    userData: User | null
  }
}

const callback: FastifyPluginAsync<{ fetchUser: boolean }> = async (
  fastify,
  opts
) => {
  const { fetchUser = true } = opts
  fastify.decorateRequest('userData', null)

  fastify.addHook('preHandler', async (request, reply) => {
    if (!request.user) {
      reply.status(401).send({
        ok: false,
        code: 401,
        resultCode: RESULT_CODE.NOT_AUTHORIZED,
        payload: null,
        message: null,
      })
    }

    if (fetchUser) {
      const userData = await DI.userRepository.findOne(
        {
          id: request.user.id,
        },
        ['profile']
      )

      request.userData = userData ?? null
      if (!userData) {
        reply.status(401).send({
          ok: false,
          code: 401,
          resultCode: RESULT_CODE.NOT_AUTHORIZED,
          payload: null,
          message: null,
        })
      }
    }
  })
}

const authorized = fp(callback, {
  name: 'authorized',
})

export default authorized
