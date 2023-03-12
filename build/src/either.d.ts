declare function either(func: any, errorMsg: string): Either;
declare class Either {
    func: any;
    constructor(func: any);
    orNull(): void;
    or(falsyFunc: any): void;
    orThrow(message: string): void;
    orCatch(catchBlock: any): void;
}
