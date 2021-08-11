import { DI } from 'app'
import { User, UserProfile } from 'entities'

class AtuhRepository {
  public static async findByEmail(email: string): Promise<User> {
    return DI.em.findOne(
      User,
      { email },
      {
        populate: ['profile'],
      }
    )
  }

  public static async findByUsernameOrEmail(
    email: string,
    username: string
  ): Promise<['email' | 'username' | null, boolean]> {
    const exists = await DI.em.findOne(
      User,
      {
        $or: [
          {
            email,
          },
          {
            profile: {
              username,
            },
          },
        ],
      },
      ['profile']
    )

    if (exists) {
      return exists.email === email ? ['email', true] : ['username', true]
    }

    return [null, false]
  }

  public static async create(
    input: Pick<User, 'email' | 'password'> &
      Pick<UserProfile, 'username' | 'gender' | 'birthday'>
  ): Promise<User> {
    const profile = new UserProfile()
    profile.username = input.username
    profile.gender = input.gender
    profile.birthday = input.birthday

    await DI.em.persist(profile).flush()

    const user = new User()
    user.email = input.email
    user.password = input.password
    user.profile = profile

    await DI.em.persist(user).flush()

    return user
  }
}

export default AtuhRepository
