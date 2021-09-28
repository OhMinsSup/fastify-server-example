import { FastifyRequest, FastifyReply } from 'fastify'
import PickService from 'services/PickService'

class PickController {
  private pickService: PickService

  constructor() {
    this.pickService = new PickService()
  }

  createPick = async (request: FastifyRequest<any>, reply: FastifyReply) => {
    try {
      return reply.status(200).send(true)
    } catch (error) {
      console.error(error)
      throw error
    }
  }
}

const pickController = new PickController()

export default pickController
