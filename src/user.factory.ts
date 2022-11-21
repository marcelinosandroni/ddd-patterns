import { randomUUID } from "crypto"
import { Email } from "./email.value-object"
import { Name } from "./name.value-object"
import { Password } from "./password.value-object"
import { User } from "./user"

export class UserFactory  {
  static create(
    name: string,
    age: number,
    email: string,
    password: string
): User {
    const id = randomUUID()
    return new User(
      id,
      new Name(name),
      age,
      new Email(email),
      new Password(password)
    )
  }

}


