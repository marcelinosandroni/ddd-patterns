import {Entity} from './base.entity'
import { Email } from './email.value-object'
import { EntityError } from './entity.error'
import { Name } from './name.value-object'
import { Password } from './password.value-object'

export class User extends Entity {
  constructor(
    public id: string,
    public name: Name,
    public age: number,
    public email: Email,
    public password: Password
  ) {
    super()
    this.validate()
  }

  protected validate(): void {
    if (typeof this.id !== 'string') {
      throw new Error(`Invalid format ${this.id}`)
    }
    if (this.id.length === 0) {
      throw new Error('Empty id')
    }
    if (this.id.length < 10) {
      throw new Error('Too short id')
    }

    if (typeof this.age !== 'number') {
      throw new Error('Age must be a number')
    }
    if (this.age < 0) {
      throw new EntityError('Age must be 0 or positive number')
    }
  }

  toString(): string {
    return JSON.stringify(this.toPlain())
  }

  toPlain(): Record<'id' | 'name' | 'age', unknown> {
    return {id: this.id, name: this.name.value, age: this.age, email: this.email.value}
  }
}
