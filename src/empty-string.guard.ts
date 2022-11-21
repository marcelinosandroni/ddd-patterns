import { ValidationError } from "./validation.error"

export class EmptyStringGuard {
  constructor(public readonly value: string, public readonly propertyName: string) {
    this.validate()
  }

  validate(): void {
    if (typeof this.value !== 'string') {
      throw new ValidationError(`${this.propertyName}: Value must be string`)
    }
    if (!this.value.trim().length) {
      throw new ValidationError('String must not be empty')
    }
  }
}
