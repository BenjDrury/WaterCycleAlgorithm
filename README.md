# WaterCycleAlgorithm

JavaScript Implementation of the Water Cycle Algorithm. Terminal Executable only.

# Prerequisites

You need to install Node & NPM first to install and run all dependencies.
Follow the instructions on https://docs.npmjs.com/downloading-and-installing-node-js-and-npm to install if you haven't already.

# Run Code

- 1.  Clone repository
- 2.  Run "npm install"
- 3.  Run "npm run start"

# Adding Your own problem to solve

1. The folder src/problems has 4 Problems configured. In order to add your own Problem, create a new file and replace the
   main function, restrictions, lower and upper bounds with your own. Also add an expected optimum if you have one, to receive
   the percentual off-set of it for every solution that is found.

2. Import the Problem in the src/main.ts file and create a new Solver for it and run the doSolve function passing int the wanted parameters for the WC-Algorithm.
