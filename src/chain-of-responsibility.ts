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

    public then<T2>(
      func: (result: T) => T2,
      errorPredicate = (result: T2) => false,
      errorMessage = (result: T2) => ''
    ): Handler<T2> {
      try {
        const result = func(this.prev);

        if (errorPredicate(result)) {
          throw new Error(errorMessage(result));
        }

        return new Handler<T2>(result);
      } catch (e: any) {
        throw new Error(e.message);
      }
    }
  }
}
