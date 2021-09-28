import { Pick as PickEntity, PickPlace, User } from 'entities'

export interface CreatePickInput
  extends Pick<PickEntity, 'url_slug' | 'title' | 'description'>,
    Omit<PickPlace, 'pick' | 'id' | 'createdAt' | 'updatedAt'> {
  userIds: User['id'][]
  tags: string[]
}

class PickService {
  async create(input: CreatePickInput) {
    try {
    } catch (error) {
      console.error(error)
      throw error
    }
  }
}

export default PickService
