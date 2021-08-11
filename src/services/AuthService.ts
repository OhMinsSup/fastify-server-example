import { StatusCodes } from 'http-status-codes'
import { User, UserProfile } from 'entities'
import { RESULT_CODE } from 'constants/constant'
import AtuhRepository from 'repositories/AuthRepository'

class AuthService {
  async signup(
    body: Pick<User, 'email' | 'password'> &
      Pick<UserProfile, 'username' | 'gender' | 'birthday'>
  ) {
    try {
      const [exists, ok] = await AtuhRepository.findByUsernameOrEmail(
        body.email,
        body.username
      )

      if (ok && exists) {
        return {
          ok: false,
          code: StatusCodes.OK,
          resultCode: RESULT_CODE.ALREADY_EXIST,
          payload: exists,
          message:
            exists === 'email'
              ? '이미 사용중인 이메일입니다. 다시 입려해주세요.'
              : '이미 사용중인 유저명입니다. 다시 입력해주세요.',
        }
      }

      await AtuhRepository.create(body)

      return {
        ok: true,
        code: StatusCodes.OK,
        resultCode: RESULT_CODE.OK,
        payload: null,
        message: null,
      }
    } catch (error) {
      console.error(error)
      throw error
    }
  }
  async login(body: Pick<User, 'email' | 'password'>) {
    try {
      const exists = await AtuhRepository.findByEmail(body.email)
      if (!exists) {
        return {
          ok: false,
          code: StatusCodes.NOT_FOUND,
          resultCode: RESULT_CODE.NOT_EXIST,
          message: '존재하지 않는 유저 정보입니다.',
          payload: null,
        }
      }

      const checked = await exists.checkPassword(body.password)
      if (!checked) {
        return {
          ok: false,
          code: StatusCodes.OK,
          resultCode: RESULT_CODE.INCORRECT_PASSWORD,
          message: '비밀번호가 일치하지 않습니다.',
          payload: null,
        }
      }

      const tokens = await exists.generateUserToken()

      return {
        ok: true,
        code: StatusCodes.OK,
        resultCode: RESULT_CODE.OK,
        message: null,
        payload: {
          tokens,
          user: exists.toJSON(),
        },
      }
    } catch (error) {
      console.error(error)
      throw error
    }
  }
}

export default AuthService
