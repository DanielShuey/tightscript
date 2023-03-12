export function cascade() {
  return new ChainOfResponsibility.Handler(0);
}

namespace ChainOfResponsibility {
  export class Handler<T> {
    private prev: T;

    constructor(prev: T) {
      this.prev = prev;
    }

    async result(): Promise<T> {
      return await this.prev;
    }

    async reject(
      predicate: (prev: T) => boolean,
      message: string
    ): Promise<Handler<T>> {
      if (predicate(await this.prev)) {
        throw new Error(message);
      }
      return await this;
    }

    async then<T2>(func: (prev: T) => Promise<T2>): Promise<Handler<T2>> {
      try {
        const result: T2 = await func(this.prev);
        return new Handler<T2>(result);
      } catch (e: any) {
        throw new Error(e.message);
      }
    }
  }
}
