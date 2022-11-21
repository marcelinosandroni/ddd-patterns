export abstract class ValueObject<T> {
  constructor(public readonly value: T) {
    this.validate()
  }

  protected abstract validate(): void
}
