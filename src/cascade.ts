export function cascade() {
  return new ChainOfResponsibility.Handler(0);
}

namespace ChainOfResponsibility {
  // Have to run all at once due to promises

  export class Handler<T> {
    private prev: Promise<T>;

    constructor(prev: T | Promise<T>) {
      this.prev = new Promise(() => prev);
    }

    result(): Promise<T> {
      return this.prev;
    }

    reject(predicate: (prev: T) => boolean, message: string): Handler<T> {
      this.prev.then(x => {
        if (predicate(x)) {
          throw new Error(message);
        }
      });
      return this;
    }

    then<T2>(func: (prev: T) => T2 | PromiseLike<T2>): Handler<T2> {
      try {
        const result = this.prev.then(func);
        return new Handler<T2>(result);
      } catch (e: any) {
        throw new Error(e.message);
      }
    }
  }
}
