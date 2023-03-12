export function cascade() {
  return new ChainOfResponsibility.Handler();
}

namespace ChainOfResponsibility {
  export class Handler<T> {
    private first: any;
    private next?: any;
    private func: any;
    private errorPredicate: any;
    private errorMessage: any;

    constructor(first?: any) {
      this.first = first === undefined ? this : first;
    }

    public then<T2>(
      func: (previousResult: T) => T2,
      errorPredicate = (result: T2) => false,
      errorMessage = (result: T2) => ''
    ): Handler<T2> {
      const successor = new Handler<T2>(this.first);
      successor.func = func;
      successor.errorPredicate = errorPredicate;
      successor.errorMessage = errorMessage;

      this.next = successor;
      successor.first = this.first;
      return successor;
    }

    private runChain() {
      try {
        const result = this.func();

        if (this.errorPredicate(result)) {
          throw new Error(this.errorMessage(result));
        } else if (this.next) {
          this.next.runChain();
        }
      } catch (e: any) {
        throw new Error(e.message);
      }
    }

    public perform(): any {
      return this.first.runChain();
    }
  }
}
