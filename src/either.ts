function either(func: any, errorMsg: string): Either {
  return new Either(func);
}

class Either {
  func: any;

  constructor(func: any) {}

  orNull(): void {}

  or(falsyFunc: any): void {}

  orThrow(message: string): void {
    try {
      const value = this.func();
      if (!value) {
        // falsey
        throw Error(message);
      }
    } catch (error) {
      throw Error(message);
    }
  }

  orCatch(catchBlock: any): void {
    try {
      this.func();
    } catch (error) {
      catchBlock();
    }
  }
}
