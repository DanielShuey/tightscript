"use strict";
var ChainOfResponsibility;
(function (ChainOfResponsibility) {
    function chainOfResponsibility() {
        return new Handler();
    }
    ChainOfResponsibility.chainOfResponsibility = chainOfResponsibility;
    class Handler {
        chain(func, errorPredicate = (result) => true, errorMessage = (result) => '') {
            const successor = new Handler();
            successor.func = func;
            successor.errorPredicate = errorPredicate;
            successor.errorMessage = errorMessage;
            this.next = successor;
            successor.prev = this;
            return this;
        }
        first() {
            let initial;
            initial = this;
            while (true) {
                if (initial)
                    initial = this.prev;
                else
                    break;
            }
            return initial !== null && initial !== void 0 ? initial : this;
        }
        runChain() {
            const result = this.func();
            if (this.errorPredicate(result)) {
                throw new Error(this.errorMessage(result));
            }
            else if (this.next) {
                this.next.runChain();
            }
        }
        perform() {
            this.first().runChain();
        }
    }
})(ChainOfResponsibility || (ChainOfResponsibility = {}));
//# sourceMappingURL=cor.js.map