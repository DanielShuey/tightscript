export function cascade() {
  return new ChainOfResponsibility.Handler(0);
}

namespace ChainOfResponsibility {
  export class Handler<T> {
    private prev: T;

    constructor(prev: T) {
      this.prev = prev;
    }

    public result(): T {
      return this.prev;
    }

    public throwIf(
      predicate: (prev: T) => boolean,
      message: string
    ): Handler<T> {
      if (predicate(this.prev)) {
        throw new Error(message);
      }
      return this;
    }

    public next<T2>(func: (prev: T) => T2): Handler<T2> {
      try {
        const result: T2 = func(this.prev);
        return new Handler<T2>(result);
      } catch (e: any) {
        throw new Error(e.message);
      }
    }
  }
}
