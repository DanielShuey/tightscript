export declare function cascade(): ChainOfResponsibility.Handler<number>;
declare namespace ChainOfResponsibility {
    class Handler<T> {
        private prev;
        constructor(prev: T);
        result(): T;
        reject(predicate: (prev: T) => Promise<boolean>, message: string): Handler<T>;
        tap<T2>(func: (prev: T) => T2): Handler<T2>;
    }
}
export {};
