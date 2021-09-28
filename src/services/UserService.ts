import { RESULT_CODE } from 'constants/constant'
import { StatusCodes } from 'http-status-codes'
import UserRepository from 'repositories/UserRepository'

interface Pagination {
  pageNo: number
  limit: number
}

export interface ListParams extends Pagination {
  username?: string
}

class UserService {
  async list(params: ListParams) {
    try {
      const result = await UserRepository.findAllUsers(params)
      return {
        ok: true,
        code: StatusCodes.OK,
        resultCode: RESULT_CODE.OK,
        payload: result,
        message: null,
      }
    } catch (error) {
      console.error(error)
      throw error
    }
  }
}

export default UserService
