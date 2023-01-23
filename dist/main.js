"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Excel = require("exceljs");
const wca_solver_1 = require("./solver/wca-solver");
const problems_1 = require("./problems");
const doSearches = (problemName = "Problem", solver, searches = 20, Nsr = 8, dMax = 0.001, Npop = 50, Niterations = 5000) => {
    console.log(`Solving ${problemName}...`);
    ws.addRow([`Data for the Search of solving ${problemName}`]);
    const columnTitles = ["Iteration"];
    for (let i = 1; i <= solver.getProblem.getNumOfVars; i++) {
        columnTitles.push(`x${i}`);
    }
    for (let i = 1; i < solver.getProblem.getConstraints.length; i++) {
        columnTitles.push(`r${i} cross`);
    }
    ws.addRow(columnTitles.concat([
        "Bounds cross",
        "Volume",
        "Offset to expected Optiumum in %",
        "Search Time",
    ]));
    for (let i = 1; i <= searches; i++) {
        console.log(`Solving ${problemName}...${i}/${searches}`);
        const startTime = Date.now();
        const sol = solver.solve(Nsr, dMax, Npop, Niterations);
        ws.addRow([
            i + 1,
            ...sol.getValues,
            ...solver.getProblem.getConstraints.map((constraint) => constraint(sol.getValues)),
            sol.getCost,
            solver.getProblem
                ? Math.round(Math.abs(sol.getCost - solver.getProblem.optimum) /
                    solver.getProblem.optimum)
                : "-",
            Date.now() - startTime,
        ]);
    }
    console.log(`Solving ${problemName}...Done!`);
};
// Create a Solver for each Problem, it is possible to pass in a value for C and the tolerance for restrictioncrosses in the Contructor
const myA1Solver = new wca_solver_1.WCASolver(problems_1.A1Problem);
const myA2Solver = new wca_solver_1.WCASolver(problems_1.A2Problem);
const myA3Solver = new wca_solver_1.WCASolver(problems_1.A3Problem);
const produktionsentscheidungsSolver = new wca_solver_1.WCASolver(problems_1.ProduktionsentscheidungsProblem);
// Open A Workbook to safe results in the data folder in an .xlsx file
const wb = new Excel.Workbook();
const ws = wb.addWorksheet("Validate Algorithm");
// Collect data
doSearches("Problem A1", myA1Solver);
doSearches("Problem A2", myA2Solver);
doSearches("Problem A3", myA3Solver);
doSearches("Problem Produktionsentscheidung", produktionsentscheidungsSolver);
// Pathname where data will be stored
const pathname = "data/export.xlsx";
// Safe Data in an .xlsx file
wb.xlsx
    .writeFile(pathname)
    .then((lol) => console.log("Saved"))
    .catch((err) => console.warn(`Could not save the data. Make sure the File with the pathname(${pathname}) exists, is not open in any other program and that it has no important data as it will be replaced.`));
