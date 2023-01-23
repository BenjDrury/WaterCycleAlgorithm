"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Raindrop = void 0;
class Raindrop {
    constructor(calcCosts) {
        this.values = [];
        this.cost = 0;
        this.calcCosts = calcCosts;
    }
    get getValues() {
        return [...this.values];
    }
    get getCost() {
        return this.cost;
    }
    setValues(values) {
        this.values = values;
        this.cost = this.calcCosts(values);
    }
}
exports.Raindrop = Raindrop;
