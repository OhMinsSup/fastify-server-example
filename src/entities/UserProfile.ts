import {
  Cascade,
  Entity,
  Enum,
  Index,
  JsonType,
  OneToOne,
  Property,
  wrap,
} from '@mikro-orm/core'
import { BaseEntity, User } from 'entities'

export type SocialLink = {
  [key: string]: string
}

export enum GenderType {
  Male = 'M',
  FeMale = 'F',
}

@Entity()
export class UserProfile extends BaseEntity {
  @Index()
  @Property({
    nullable: false,
    type: 'string',
    unique: true,
  })
  username: string

  @Property({ type: 'string', nullable: true })
  thumbnailUrl: string

  @Property({ nullable: false })
  birthday: number

  @Enum({ items: () => GenderType, nullable: false })
  gender: GenderType

  @Property({ type: JsonType, nullable: true })
  socialLinks?: SocialLink

  @OneToOne(() => User, (user) => user.profile, { cascade: [Cascade.REMOVE] })
  user: User

  toJSON(): UserProfile {
    const o = wrap(this).toObject()

    delete o.user
    delete o.updatedAt
    delete o.createdAt

    return o as UserProfile
  }
}
