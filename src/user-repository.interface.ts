import { Repository } from "./repository.interface";
import { User } from "./user";

export interface UserRepository extends Repository<User> {
  getAll(): User[]
  getOne(): User
  create(user: User): User
  update(user: Partial<User>): User
}
