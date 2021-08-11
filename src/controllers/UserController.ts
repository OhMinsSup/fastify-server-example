import { FastifyRequest, FastifyReply } from 'fastify'
import isEmpty from 'lodash/isEmpty'
import UserService from 'services/UserService'

class UserController {
  private userService: UserService

  constructor() {
    this.userService = new UserService()
  }

  list = async (request: FastifyRequest<any>, reply: FastifyReply) => {
    try {
      let queryParams = {
        ...(isEmpty(request.query)
          ? {
              limit: 10,
              pageNo: 1,
            }
          : request.query),
      }

      const result = await this.userService.list(queryParams)
      return reply.status(result.code).send(result)
    } catch (error) {
      console.error(error)
      throw error
    }
  }
}

const userController = new UserController()

export default userController
