export function cascade() {
  return new ChainOfResponsibility.Handler(0);
}

namespace ChainOfResponsibility {
  // Have to run all at once due to promises

  export class Handler<T> {
    private prev: T;

    constructor(prev: T) {
      this.prev = prev;
    }

    result(): T {
      return this.prev;
    }

    reject(
      predicate: (prev: T) => Promise<boolean>,
      message: string
    ): Handler<T> {
      predicate(this.prev).then(result => {
        if (result) throw new Error(message);
      });
      return this;
    }

    tap<T2>(func: (prev: T) => T2): Handler<T2> {
      try {
        return new Handler<T2>(func(this.prev));
      } catch (e: any) {
        throw new Error(e.message);
      }
    }
  }
}
