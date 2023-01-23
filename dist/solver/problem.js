"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Problem = void 0;
class Problem {
    constructor(problem, minimize, constraints, numOfVars, lowerBounds, upperBounds, expectedSolution) {
        this.calcCostFor = (values) => this.problem(values);
        this.calcConstraintsCrossFor = (values) => this.constraints.reduce((prev, constraint) => prev + constraint(values), 0);
        this.problem = problem;
        this.minimize = minimize;
        this.constraints = constraints;
        this.numOfVars = numOfVars;
        this.lowerBounds = lowerBounds;
        this.upperBounds = upperBounds;
        this.expectedSolution = expectedSolution;
    }
    get getNumOfVars() {
        return this.numOfVars;
    }
    get getConstraints() {
        return [...this.constraints];
    }
    get isToMinimize() {
        return this.minimize;
    }
    get optimum() {
        return this.expectedSolution;
    }
    get getUB() {
        return this.upperBounds;
    }
    get getLB() {
        return this.lowerBounds;
    }
}
exports.Problem = Problem;
