import {
  Cascade,
  Collection,
  Entity,
  Index,
  ManyToMany,
  ManyToOne,
  OneToMany,
  Property,
} from '@mikro-orm/core'
import { PickPlace, User, BaseEntity } from 'entities'

@Entity()
export class Pick extends BaseEntity {
  @Index()
  @Property({
    length: 255,
    unique: true,
    nullable: false,
  })
  url_slug: string

  @Property({ nullable: false })
  title: string

  @Property({ length: 255 })
  description: string

  @Property({ default: true })
  is_private: boolean

  @ManyToOne({ entity: () => User, cascade: [Cascade.ALL], eager: true })
  ownerUser: User

  @ManyToMany({ entity: () => User, owner: true })
  pickUsers = new Collection<User>(this)

  @OneToMany(() => PickPlace, (pickPlace) => pickPlace.pick)
  pickPlaces = new Collection<PickPlace>(this)
}
