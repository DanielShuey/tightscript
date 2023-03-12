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

    public reject(
      predicate: (prev: T) => boolean,
      message: string
    ): Handler<T> {
      if (predicate(this.prev)) {
        throw new Error(message);
      }
      return this;
    }

    public async then<T2>(func: (prev: T) => T2): Promise<Handler<T2>> {
      try {
        const result: T2 = await func(this.prev);
        return new Handler<T2>(result);
      } catch (e: any) {
        throw new Error(e.message);
      }
    }
  }
}
