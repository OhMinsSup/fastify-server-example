import { DI } from 'app'
import { User } from 'entities'

export interface FindAllUsersParams {
  pageNo: number
  limit: number
}

class UserRepository {
  public static async findAllUsers(params: FindAllUsersParams) {
    const { pageNo, limit } = params

    const skip = (pageNo - 1) * limit
    try {
      const [users, count] = await DI.em.findAndCount(
        User,
        {},
        {
          offset: skip,
          limit: limit,
          populate: ['profile'],
          orderBy: {
            id: 'DESC',
          },
        }
      )

      return {
        users,
        totalCount: count,
        currentPageNo: pageNo,
        nextPageNo: pageNo + 1,
      }
    } catch (error) {
      console.error(error)
      throw error
    }
  }
}

export default UserRepository
