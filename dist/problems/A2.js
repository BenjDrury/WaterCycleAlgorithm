"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const problem_1 = require("../solver/problem");
const mainProblem = ([x1, x2, x3, x4, x5]) => 5.3578547 * x3 * x3 * x3 + 0.8356891 * x1 * x5 + 37.293239 * x1 + 40729.141;
const LB = [78, 33, 27, 27, 27];
const UB = [102, 45, 45, 45, 45];
const constraints = [
    ([x1, x2, x3, x4, x5]) => {
        const res = 85.334407 +
            0.0056858 * x2 * x5 +
            0.0006262 * x1 * x4 -
            0.0022053 * x3 * x5 -
            92;
        if (res > 0) {
            return res;
        }
        else {
            return 0;
        }
    },
    ([x1, x2, x3, x4, x5]) => {
        const res = -85.334407 -
            0.0056858 * x2 * x5 -
            0.0006262 * x1 * x4 -
            0.0022053 * x3 * x5;
        if (res > 0) {
            return res;
        }
        else {
            return 0;
        }
    },
    ([x1, x2, x3, x4, x5]) => {
        const res = 80.51249 +
            0.0071317 * x2 * x5 +
            0.0029955 * x1 * x2 +
            0.0021813 * x3 * x3 -
            110;
        if (res > 0) {
            return res;
        }
        else {
            return 0;
        }
    },
    ([x1, x2, x3, x4, x5]) => {
        const res = -80.51249 -
            0.0071317 * x2 * x5 -
            0.0029955 * x1 * x2 -
            0.0021813 * x3 * x3 +
            90;
        if (res > 0) {
            return res;
        }
        else {
            return 0;
        }
    },
    ([x1, x2, x3, x4, x5]) => {
        const res = 9.300961 +
            0.0047026 * x3 * x5 +
            0.0012547 * x1 * x3 +
            0.0019085 * x3 * x4 -
            25;
        if (res > 0) {
            return res;
        }
        else {
            return 0;
        }
    },
    ([x1, x2, x3, x4, x5]) => {
        const res = -9.300961 -
            0.0047026 * x3 * x5 -
            0.0012547 * x1 * x3 -
            0.0019085 * x3 * x4 +
            20;
        if (res > 0) {
            return res;
        }
        else {
            return 0;
        }
    },
    (values) => {
        let res = 0;
        res += values.reduce((prev, current, index) => {
            if (current < LB[index]) {
                return prev + Math.abs(LB[index] - current);
            }
            else if (current > UB[index]) {
                return prev + Math.abs(UB[index] - current);
            }
            else {
                return prev + 0;
            }
        }, 0);
        return res;
    },
];
const expectedSolution = 186692.9211634664;
const A2Problem = new problem_1.Problem(mainProblem, // main function
true, // to minimize
constraints, // with constraints
5, // number of vars
LB, // LB for all vars
UB, // UP for all vars
expectedSolution);
exports.default = A2Problem;
