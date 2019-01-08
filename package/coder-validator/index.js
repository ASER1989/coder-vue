export class validator {
    constructor(rules) {
        this.rules = rules;
        this.result = true;
        this.errorKey = null;
        this.errorVal = null;
    }

    onError(res = null) {
        this.result = res == null;
        return res == null;
    }

    then(fn) {
        typeof fn == "function" && fn(this.result, this.errorKey, this.errorVal);
    }

    onSuccess(fn) {
        this.result && typeof fn == "function" && fn();
    }

    onValidate(data) {
        this.result = true;
        this.errorKey = null;
        this.errorVal = null;

        for (var k in data) {
            var fn = this.rules[k];
            typeof fn == "function" && fn(null, data[k], res => this.onError(res));

            if (!this.result) {
                this.errorKey = k;
                this.errorVal = data[k];
                break;
            }
        }

        return this;
    }

}
