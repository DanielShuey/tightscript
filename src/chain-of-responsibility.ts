export function chain() {
  return new ChainOfResponsibility.Handler();
}

namespace ChainOfResponsibility {
  export class Handler {
    private prev?: Handler;
    private next?: Handler;
    private func: any;
    private errorPredicate: any;
    private errorMessage: any;

    public chain<ResultType>(
      func: ResultType,
      errorPredicate = (result: ResultType) => true,
      errorMessage = (result: ResultType) => ''
    ): Handler {
      const successor = new Handler();
      successor.func = func;
      successor.errorPredicate = errorPredicate;
      successor.errorMessage = errorMessage;

      this.next = successor;
      successor.prev = this;
      return this;
    }

    private first(): Handler {
      let initial: Handler | undefined;

      initial = this;

      while (true) {
        if (initial) initial = this.prev;
        else break;
      }

      return initial ?? this;
    }

    private runChain() {
      const result = this.func();

      if (this.errorPredicate(result)) {
        throw new Error(this.errorMessage(result));
      } else if (this.next) {
        this.next.runChain();
      }
    }

    public perform() {
      this.first().runChain();
    }
  }
}
