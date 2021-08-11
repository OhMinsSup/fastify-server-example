import {} from '@mikro-orm/core'
import { DI } from 'app'
import { User } from 'entities'
import { ListParams } from 'services/UserService'

class UserRepository {
  public static async findAllUsers(params: ListParams) {
    const { pageNo, limit } = params

    const skip = (pageNo - 1) * limit
    try {
      const [users, count] = await DI.em.findAndCount(
        User,
        params.username
          ? {
              profile: {
                username: {
                  $like: params.username,
                },
              },
            }
          : {},
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
        nextPageNo: limit > users.length ? pageNo : pageNo + 1,
      }
    } catch (error) {
      console.error(error)
      throw error
    }
  }
}

export default UserRepository
