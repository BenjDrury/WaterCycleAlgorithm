import { Problem } from "../problem";

const n = 20;

const mainProblem = (values: Array<number>) =>
  -Math.pow(Math.sqrt(n), n) *
  values.reduce((prev, current) => prev * current, 1);

const LB: Array<number> = [];
const UB: Array<number> = [];

for (let i = 0; i < n; i++) {
  LB.push(0);
  UB.push(1);
}

const constraints = [
  (values: Array<number>) => {
    const res = values.reduce(
      (prev, current) => prev + Math.pow(current, 2),
      0
    );

    return Math.abs(res - 1);
  },
  (values: Array<number>) => {
    let res = 0;
    res += values.reduce((prev, current, index) => {
      if (current < LB[index]) {
        return prev + Math.abs(LB[index] - current);
      } else if (current > UB[index]) {
        return prev + Math.abs(UB[index] - current);
      } else {
        return prev + 0;
      }
    }, 0);

    return res;
  },
];

const expectedSolution = -1;

const A3Problem: Problem = new Problem(
  mainProblem, // main function
  true, // to minimize
  constraints, // with constraints
  n, // number of vars
  LB, // LB for all vars
  UB, // UP for all vars
  expectedSolution // expected Optimum
);

export default A3Problem;
