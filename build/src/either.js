"use strict";
function either(func, errorMsg) {
    return new Either(func);
}
class Either {
    constructor(func) { }
    orNull() { }
    or(falsyFunc) { }
    orThrow(message) {
        try {
            const value = this.func();
            if (!value) {
                // falsey
                throw Error(message);
            }
        }
        catch (error) {
            throw Error(message);
        }
    }
    orCatch(catchBlock) {
        try {
            this.func();
        }
        catch (error) {
            catchBlock();
        }
    }
}
//# sourceMappingURL=either.js.map