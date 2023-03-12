export function cascade() {
  return new ChainOfResponsibility.Handler(0);
}

namespace ChainOfResponsibility {
  export class Handler<T> {
    private prev: T;

    constructor(prev: T) {
      this.prev = prev;
    }

    result(): T {
      return this.prev;
    }

    reject(predicate: (prev: T) => boolean, message: string): Handler<T> {
      if (predicate(this.prev)) {
        throw new Error(message);
      }
      return this;
    }

    then<T2>(func: (prev: T) => T2): Handler<T2> {
      try {
        return new Handler<T2>(func(this.prev));
      } catch (e: any) {
        throw new Error(e.message);
      }
    }
  }
}
