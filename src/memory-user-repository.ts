import { CreateUserDto } from './create-user.dto'
import { Email } from './email.value-object'
import { Name } from './name.value-object'
import { UpdateUserDto } from './update-user.dto'
import { User } from './user'
import {UserRepository} from './user-repository.interface'
import { UserResponseDto } from './user-response.dto'
import { UserFactory } from './user.factory'

interface UserQuery  {
  id?: string
  name?: string
}

export class MemoryUserRepository {
  private users: User[] = []

  constructor(users?: User[]) {
    if (users) {
      this.users = users
    }
  }

  getAll(): User[] {
    return this.users
  }

  getById(id: string): User | void {
    return this.users.find(user => user.id === id)
  }

  getByName(name: string): User | void {
    return this.users.find(user => user.name.value.includes(name))
  }
  
  create(createUser: CreateUserDto): User {
    const hasPropertiesToCreate = Object.values(createUser).every(Boolean)
    if (!hasPropertiesToCreate) {
      throw new Error('Must send user atributes to create')
    }
    const {name, age, email, password} = createUser
    const user = UserFactory(name, age, email, password)
    this.users.push(user)
    return user
  }

  update(id: string, updateUser: UpdateUserDto): User {
    const {name, email} = updateUser
    if (!name || !email) {
      throw new Error('Must inform properties to update')
    }
    const existingUserIndex = this.users.findIndex(user => user.id === id)
    const userExist = existingUserIndex !== -1
    if (!userExist) {
      throw new Error(`User with id ${id} don't exist`)
    }
    if (updateUser.name) {
      this.users[existingUserIndex].name = new Name(updateUser.name)
    }
    if (updateUser.email) {
      this.users[existingUserIndex].email = new Email(updateUser.email)
    }
    return this.users[existingUserIndex]
 }


}
