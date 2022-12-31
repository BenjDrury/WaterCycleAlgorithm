import { WCASolver } from "./wca-solver";
import { A1Problem, A2Problem, A3Problem } from "./problems";

const myA1Solver: WCASolver = new WCASolver(A1Problem);
const myA2Solver: WCASolver = new WCASolver(A2Problem, undefined, 0, 0);
const myA3Solver: WCASolver = new WCASolver(A3Problem);

const currentSolver = myA1Solver;
const solutions: Array<number> = [];
for (let i = 0; i < 20; i++) {
  const startTime = Date.now();
  const solution = currentSolver.solve(8, 0.001, 50, 1000);
  const endTime = Date.now();
  console.log(
    `It took ${
      (endTime - startTime) / 1000
    } seconds to solve with the solution ${solution.getCost}, which is ${(
      Math.abs(
        (solution.getCost - currentSolver.getProblem.optimum) /
          currentSolver.getProblem.optimum
      ) * 100
    ).toPrecision(2)}% off from the actual solution`
  );
  console.log("Values: ", solution.getValues);
  solutions.push(solution.getCost);
}

console.log(
  "Avg. :",
  solutions.reduce((prev, current) => prev + current, 0) / solutions.length
);
