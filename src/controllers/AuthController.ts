import { FastifyReply, FastifyRequest } from 'fastify'
import { StatusCodes } from 'http-status-codes'
import Joi from 'joi'

import { RESULT_CODE } from 'constants/constant'
import { GenderType } from 'entities'

import AuthService from 'services/AuthService'

class AuthController {
  private authService: AuthService

  constructor() {
    this.authService = new AuthService()
  }

  signup = async (request: FastifyRequest, reply: FastifyReply) => {
    const schema = Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      username: Joi.string()
        .regex(/^[ㄱ-ㅎ가-힣a-z0-9-_]+$/)
        .max(16)
        .required(),
      gender: Joi.string().valid(GenderType.Male, GenderType.FeMale).optional(),
      birthday: Joi.number().required(),
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

      const result = await this.authService.signup(body)
      return reply.status(result.code).send(result)
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  login = async (request: FastifyRequest, reply: FastifyReply) => {
    const schema = Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
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

      const result = await this.authService.login(body)
      if (result.ok) {
        const {
          payload: { tokens },
        } = result

        // Add auth token to response
        reply
          .setCookie('refresh_token', tokens.refreshToken, {
            maxAge: 1000 * 60 * 60 * 24 * 30,
            httpOnly: true,
            path: '/',
          })
          .setCookie('access_token', tokens.accessToken, {
            maxAge: 1000 * 60 * 60 * 24 * 7,
            httpOnly: true,
            path: '/',
          })
      }
      return reply.status(result.code).send(result)
    } catch (error) {
      console.error(error)
      throw error
    }
  }
}

const authController = new AuthController()

export default authController
