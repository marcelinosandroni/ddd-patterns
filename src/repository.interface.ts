export interface Repository<T> {
  getAll(): T[]
  getOne(): T
  create(entity: T): T
  update(entity: Partial<T>): T
}
