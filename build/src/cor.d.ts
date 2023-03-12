declare namespace ChainOfResponsibility {
    export function chainOfResponsibility(): Handler;
    class Handler {
        private prev?;
        private next?;
        private func;
        private errorPredicate;
        private errorMessage;
        chain<ResultType>(func: ResultType, errorPredicate?: (result: ResultType) => boolean, errorMessage?: (result: ResultType) => string): Handler;
        private first;
        private runChain;
        perform(): void;
    }
    export {};
}
