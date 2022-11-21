import { ValueObjectError } from "./value-object.error"

export class Name {
  constructor(public readonly value: string) {
    this.validate()
  }

  private validate(): void {
    if (!this.value || typeof this.value !== 'string') {
      throw new ValueObjectError('Invalid format')
    }

    if (!this.value.trim().length) {
      throw new ValueObjectError('Empty string')
    }
  }

  toString(): string {
    return this.value
  }

  valueOf(): string {
    return this.value
  }
}
