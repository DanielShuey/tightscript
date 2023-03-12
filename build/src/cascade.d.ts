export declare function cascade(): ChainOfResponsibility.Handler<number>;
declare namespace ChainOfResponsibility {
    class Handler<T> {
        private prev;
        constructor(prev: T | Promise<T>);
        result(): Promise<T>;
        reject(predicate: (prev: Promise<T>) => boolean, message: string): Handler<T>;
        then<T2>(func: (prev: T) => T2 | PromiseLike<T2>): Handler<T2>;
    }
}
export {};
