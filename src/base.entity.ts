export abstract class Entity {
  protected abstract id: string
  protected abstract validate(): void
}
