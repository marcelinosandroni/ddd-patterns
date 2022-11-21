import { User } from "./user";

export class UserResponseDto {
  id: string
  name: string
  age: number
  email: string

  constructor(user: User) {
    this.id = user.id
    this.name = user.name.value
    this.age = user.age
    this.email = user.email.value
  }
}
