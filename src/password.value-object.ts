import { ValueObject } from "./base.value-object";
import { EmptyStringGuard } from "./empty-string.guard";
import { ValueObjectError } from "./value-object.error";

export class Password extends ValueObject<string> {
  private readonly minimumLength = 10

  constructor(value: string) {
    super(value)
  }

  protected validate(): void {
    new EmptyStringGuard(this.value, 'password')
    if (this.value.trim().length < this.minimumLength) {
      throw new ValueObjectError(`Password must be at least ${this.minimumLength} characters`)
    }
  }
}
