import { RESULT_CODE } from 'constants/constant'
import { StatusCodes } from 'http-status-codes'
import UserRepository, { FindAllUsersParams } from 'repositories/UserRepository'

interface ListParams extends FindAllUsersParams {}

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
