import {
  Entity,
  OneToOne,
  Property,
  BeforeCreate,
  BeforeUpdate,
  Index,
  wrap,
} from '@mikro-orm/core'
import * as bcrypt from 'bcrypt'
import { BaseEntity, UserProfile } from 'entities'
import { generateToken } from '../libs/tokens'

@Entity()
export class User extends BaseEntity {
  @Index()
  @Property({
    nullable: false,
    unique: true,
    type: 'string',
  })
  email: string

  @Property({
    nullable: false,
    type: 'string',
  })
  password: string

  @OneToOne(() => UserProfile, (userProfile) => userProfile.user, {
    owner: true,
  })
  profile: UserProfile

  toJSON(): User {
    const o = wrap(this).toObject()
    // delete serialized (password, updatedAt, createdAt)
    delete o.password
    delete o.updatedAt
    delete o.createdAt

    return o as User
  }

  @BeforeCreate()
  @BeforeUpdate()
  async hashPassword(): Promise<void> {
    // password is hashed with bcrypt
    if (this.password) {
      try {
        this.password = await bcrypt.hash(this.password, 10)
      } catch (e) {
        console.error(e)
        throw e
      }
    }
  }

  async checkPassword(password: string): Promise<boolean> {
    // check password with bcrypts
    try {
      const result = await bcrypt.compare(password, this.password)
      return result
    } catch (e) {
      console.error(e)
      throw e
    }
  }

  async generateUserToken() {
    // refresh token is valid for 30days
    const refreshToken = await generateToken(
      {
        user_id: this.id,
      },
      {
        subject: 'refresh_token',
        expiresIn: '30d',
      }
    )

    const accessToken = await generateToken(
      {
        user_id: this.id,
      },
      {
        subject: 'access_token',
        expiresIn: '1h',
      }
    )

    return {
      refreshToken,
      accessToken,
    }
  }
}
