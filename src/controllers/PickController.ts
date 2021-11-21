import { RESULT_CODE } from 'constants/constant'
import { FastifyRequest, FastifyReply } from 'fastify'
import { StatusCodes } from 'http-status-codes'
import Joi from 'joi'
import PickService from 'services/PickService'

class PickController {
  private pickService: PickService

  constructor() {
    this.pickService = new PickService()
  }

  createPick = async (request: FastifyRequest<any>, reply: FastifyReply) => {
    const schema = Joi.object().keys({
      title: Joi.string().required(),
      description: Joi.string().required(),
      slug: Joi.string().required(),
      published: Joi.boolean().required(),
      userIds: Joi.array().items(Joi.number()),
      tags: Joi.array().items(Joi.string()),
      places: Joi.array()
        .items(
          Joi.object().keys({
            name: Joi.string().required(),
            lat: Joi.number().required(),
            lng: Joi.number().required(),
            address_name: Joi.string().required(),
            category: Joi.string().required(),
            category_code: Joi.string().required(),
          })
        )
        .required(),
    })

    const { body } = request as any

    try {
      const validation = schema.validate(body)
      if (validation.error) {
        const obj = {
          ok: false,
          code: StatusCodes.BAD_REQUEST,
          resultCode: RESULT_CODE.INVALID,
          message: validation.error.message,
        }
        return reply.status(StatusCodes.BAD_REQUEST).send(obj)
      }

      return reply.status(200).send(true)
    } catch (error) {
      console.error(error)
      throw error
    }
  }
}

const pickController = new PickController()

export default pickController
