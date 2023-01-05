import * as Excel from "exceljs";
import { WCASolver } from "./wca-solver";
import { A1Problem, A2Problem, A3Problem } from "./problems";

const myA1Solver: WCASolver = new WCASolver(A1Problem);
const myA2Solver: WCASolver = new WCASolver(A2Problem, undefined, 0, 0);
const myA3Solver: WCASolver = new WCASolver(A3Problem);

const problems = [myA1Solver, myA2Solver, myA3Solver];

const wb = new Excel.Workbook();
const ws = wb.addWorksheet("Validate Algorithm");

ws.addRow([
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
  "Lösung11",
  "Lösung12",
  "Lösung13",
  "Lösung14",
  "Lösung15",
  "Lösung16",
  "Lösung17",
  "Lösung18",
  "Lösung19",
  "Lösung20",
]);

/*

 const fillTestValues = async (
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
          for (let z = 0; z < 20; z++) {
            const sol = problems[0].solve(
              possibleNsr[k],
              dmax,
              j,
              1000,
            ).getCost;
            sols.push(sol);
          }
          ws.addRow([j, possibleNsr[k], dmax, ...sols]);
        }

        data.push(newRow);
        dmax = Number((dmax + DmaxSteps).toPrecision(5));
      } while (dmax <= maxDmax);

      console.log("Done " + (j / maxPop) * 100 + "%");
      await wb.xlsx
        .writeFile("data/file1000.xlsx")
        .then((lol) => console.log("Saved " + j))
        .catch((err) => console.log("Didnt save " + j));
    }
  } catch (err) {
    console.log(err);
  }
};

fillTestValues(100, 0, 0.1, 0.005); */
/* 
ws.addRow([
  "Iteration",
  "x1",
  "x2",
  "x3",
  "x4",
  "x5",
  "x6",
  "x7",
  "Lösung",
  "Abweichung",
]);

const sols = [];
for (let i = 0; i < 100; i++) {
  sols.push(problems[0].solve(8, 0.5, 50, 1000));
  ws.addRow([
    i + 1,
    ...sols[i].getValues,
    sols[i].getCost,
    Math.abs(sols[i].getCost - 680.63) / 680.63,
  ]);
}

wb.xlsx
  .writeFile("data/validate_algorithm.xlsx")
  .then((lol) => console.log("Saved"))
  .catch((err) => console.log("Didnt save"));
 */

ws.addRow(["Population", "Nsr", "Dmax", "Lösung", "Time"]);

const fillTimeValues = async (
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
          const timeStart = Date.now();
          const sol = problems[0].solve(possibleNsr[k], dmax, j, 1000).getCost;
          const timeEnd = Date.now();
          ws.addRow([j, possibleNsr[k], dmax, sol, timeEnd - timeStart]);
        }

        data.push(newRow);
        dmax = Number((dmax + DmaxSteps).toPrecision(5));
      } while (dmax <= maxDmax);

      console.log("Done " + (j / maxPop) * 100 + "%");
      await wb.xlsx
        .writeFile("data/times.xlsx")
        .then((lol) => console.log("Saved " + j))
        .catch((err) => console.log("Didnt save " + j));
    }
  } catch (err) {
    console.log(err);
  }
};

fillTimeValues(100, 0, 0.1, 0.005);
