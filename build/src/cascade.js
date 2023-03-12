"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cascade = void 0;
function cascade() {
    return new ChainOfResponsibility.Handler(0);
}
exports.cascade = cascade;
var ChainOfResponsibility;
(function (ChainOfResponsibility) {
    // Have to run all at once due to promises
    class Handler {
        constructor(prev) {
            this.prev = new Promise(() => prev);
        }
        result() {
            return this.prev;
        }
        reject(predicate, message) {
            if (predicate(this.prev))
                throw new Error(message);
            return this;
        }
        then(func) {
            try {
                const result = this.prev.then(func);
                return new Handler(result);
            }
            catch (e) {
                throw new Error(e.message);
            }
        }
    }
    ChainOfResponsibility.Handler = Handler;
})(ChainOfResponsibility || (ChainOfResponsibility = {}));
//# sourceMappingURL=cascade.js.map