import { ValueObject } from "./base.value-object";
import { EmptyStringGuard } from "./empty-string.guard";
import { ValueObjectError } from "./value-object.error";

export class Email extends ValueObject<string> {
  constructor(value: string) {
    super(value)
  }

  protected validate(): void {
    new EmptyStringGuard(this.value, 'email')
    const emailPattern = /[\w\-\.]+@[\w-]+(\.\w+){1,3}/i
    const isValid = emailPattern.test(this.value)
    if (!isValid) {
      throw new ValueObjectError('Must be a valid email format')
    }
  }
}
