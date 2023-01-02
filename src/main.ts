import * as Excel from "exceljs";
import { WCASolver } from "./wca-solver";
import { A1Problem, A2Problem, A3Problem } from "./problems";

const myA1Solver: WCASolver = new WCASolver(A1Problem);
const myA2Solver: WCASolver = new WCASolver(A2Problem, undefined, 0, 0);
const myA3Solver: WCASolver = new WCASolver(A3Problem);

const problems = [myA1Solver, myA2Solver, myA3Solver];

const wb2 = new Excel.Workbook();
const ws2 = wb2.addWorksheet("A");
ws2.addRow([
  "Population",
  "Nsr",
  "Dmax",
  "Lösung1",
  "Lösung2",
  "Lösung3",
  "Lösung4",
  "Lösung5",
  "Lösung6",
  "Lösung7",
  "Lösung8",
  "Lösung9",
  "Lösung10",
]);

const fillTestValues = (
  maxPop: number,
  minDmax: number,
  maxDmax: number,
  DmaxSteps: number,
) => {
  try {
    for (let j = 1; j <= maxPop; j++) {
      const data: Array<Array<any>> = [];

      const possibleNsr: Array<any> = [j];
      for (let i = 1; i <= j; i++) {
        possibleNsr.push(i);
      }
      data.push(possibleNsr);
      let dmax = minDmax;
      do {
        const newRow = [dmax];

        for (let k = 0; k < possibleNsr.length - 1; k++) {
          const sols = [];
          for (let z = 0; z < 50; z++) {
            const sol = problems[0].solve(
              possibleNsr[k],
              dmax,
              j,
              1000,
            ).getCost;
            sols.push(sol);
          }
          ws2.addRow([j, possibleNsr[k], dmax, ...sols]);
        }

        data.push(newRow);
        dmax = Number((dmax + DmaxSteps).toPrecision(5));
      } while (dmax <= maxDmax);

      console.log("Done " + (j / maxPop) * 100 + "%");
    }
  } catch (err) {
    console.log(err);
  }
};

fillTestValues(100, 0, 0.1, 0.005);

wb2.xlsx
  .writeFile("data/file1000.xlsx")
  .then((lol) => console.log("Saved 2"))
  .catch((err) => console.log("Didnt save 2"));
/* 
const solutions: Array<number> = [];
for (let i = 0; i < problems.length; i++) {
  const currentSolver = problems[i];

  const startTime = Date.now();
  const solution = currentSolver.solve(8, 0.001, 50, 5000);
  const endTime = Date.now();
  console.log(
    `It took ${
      (endTime - startTime) / 1000
    } seconds to solve with the solution ${solution.getCost}, which is ${(
      Math.abs(
        (solution.getCost - currentSolver.getProblem.optimum) /
          currentSolver.getProblem.optimum,
      ) * 100
    ).toPrecision(2)}% off from the actual solution`,
  );
  console.log("Values: ", solution.getValues);
  solutions.push(solution.getCost);
}

console.log(
  "Avg. :",
  solutions.reduce((prev, current) => prev + current, 0) / solutions.length,
);
 */
