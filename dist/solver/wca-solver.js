"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WCASolver = void 0;
const raindrop_1 = require("./raindrop");
class WCASolver {
    get getProblem() {
        return this.problem;
    }
    get getIterations() {
        return this.iterations;
    }
    constructor(problem, C = 2, constrainToleranceStart = 0.01, constrainToleranceEnd = 0.001) {
        this.population = [];
        this.intensities = [];
        this.currentIteration = 0;
        this.maxIterations = 0;
        this.iterations = [];
        // is negative if second value is worse in any way
        this.compareCosts = (rainDropA, rainDropB) => {
            const tolerance = this.constrainToleranceStart -
                (this.currentIteration / this.maxIterations) *
                    (this.constrainToleranceStart - this.constrainToleranceEnd);
            const constrainBreachA = this.problem.calcConstraintsCrossFor(rainDropA.getValues);
            const constrainBreachB = this.problem.calcConstraintsCrossFor(rainDropB.getValues);
            if (constrainBreachA <= tolerance && constrainBreachB <= tolerance) {
                return this.problem.isToMinimize
                    ? rainDropA.getCost - rainDropB.getCost
                    : rainDropB.getCost - rainDropA.getCost;
            }
            else if (constrainBreachA <= tolerance && constrainBreachB > tolerance) {
                return -1;
            }
            else if (constrainBreachB <= tolerance && constrainBreachA > tolerance) {
                return 1;
            }
            else {
                return constrainBreachA - constrainBreachB;
            }
        };
        this.generateRandomRaindrop = () => {
            let rainDrop = new raindrop_1.Raindrop(this.problem.calcCostFor);
            const newValues = [];
            for (let i = 0; i < this.problem.getNumOfVars; i++) {
                newValues.push(Math.random() * (this.problem.getUB[i] - this.problem.getLB[i]) +
                    this.problem.getLB[i]);
            }
            rainDrop.setValues(newValues);
            return rainDrop;
        };
        this.generateInitPopulation = (Npop) => {
            const rainDrops = [];
            for (let i = 0; i < Npop; i++) {
                rainDrops.push(this.generateRandomRaindrop());
            }
            rainDrops.sort(this.compareCosts);
            return rainDrops;
        };
        this.calcIntensities = (Nsr, Nraindrops) => {
            let costSums = 0;
            for (let i = 0; i < Nsr; i++) {
                costSums += this.population[i].getCost;
            }
            const intensities = [];
            for (let i = 0; i < Nsr; i++) {
                const cost = this.population[i].getCost;
                intensities.push(Math.round(Math.abs(cost / costSums) * Nraindrops));
            }
            let i = intensities.length - 1;
            let tol = 2;
            while (intensities.reduce((prev, current) => prev + current, 0) > Nraindrops) {
                if (intensities[i] < tol) {
                    i--;
                }
                else {
                    intensities[i]--;
                }
                if (i < 0) {
                    tol = 1;
                    i = intensities.length - 1;
                }
            }
            while (intensities.reduce((prev, current) => prev + current, 0) <
                Nraindrops - 1) {
                intensities[0]++;
            }
            return intensities;
        };
        this.flowStreamsToRiversAndSea = (Nsr) => {
            let sumOfIntensities = Nsr;
            for (let i = 0; i < Nsr; i++) {
                const currentIntensity = this.intensities[i];
                const currentRiverValues = this.population[i].getValues;
                for (let j = sumOfIntensities; j < sumOfIntensities + currentIntensity; j++) {
                    const values = this.population[j].getValues;
                    const newValues = values.map((value, index) => {
                        return (value + Math.random() * this.C * (currentRiverValues[index] - value));
                    });
                    this.population[j].setValues(newValues);
                    if (this.compareCosts(this.population[i], this.population[j]) > 0) {
                        const store = this.population[i];
                        this.population[i] = this.population[j];
                        this.population[j] = store;
                    }
                }
                sumOfIntensities += currentIntensity;
            }
        };
        this.flowRiversToSea = (Nsr) => {
            const seaValues = this.population[0].getValues;
            for (let i = 1; i < Nsr; i++) {
                const values = this.population[i].getValues;
                const newValues = values.map((value, index) => {
                    return value + Math.random() * this.C * (seaValues[index] - value);
                });
                this.population[i].setValues(newValues);
                if (this.compareCosts(this.population[0], this.population[i]) > 0) {
                    const store = this.population[0];
                    this.population[0] = this.population[i];
                    this.population[i] = store;
                }
            }
        };
        this.evaporateAndRain = (Nsr, dMax) => {
            const seaValues = this.population[0].getValues;
            let sumOfIntensities = Nsr;
            for (let i = 1; i < Nsr; i++) {
                const currentRiverValues = this.population[i].getValues;
                const currentIntensity = this.intensities[i];
                const d = Math.sqrt(seaValues.reduce((prev, current, index) => prev + Math.pow(current - currentRiverValues[index], 2), 0));
                if (d < dMax) {
                    const newRainDrops = [];
                    for (let j = 0; j < currentIntensity + 1; j++) {
                        newRainDrops.push(this.generateRandomRaindrop());
                    }
                    newRainDrops.sort(this.compareCosts);
                    this.population[i] = newRainDrops[0];
                    let k = 1;
                    for (let j = sumOfIntensities; j < sumOfIntensities + currentIntensity; j++) {
                        this.population[j] = newRainDrops[k];
                        k++;
                    }
                }
                sumOfIntensities += currentIntensity;
            }
        };
        this.problem = problem;
        this.C = C;
        this.constrainToleranceStart = constrainToleranceStart;
        this.constrainToleranceEnd = constrainToleranceEnd;
    }
    _reset() {
        this.iterations = [];
        this.population = [];
        this.intensities = [];
        this.currentIteration = 0;
    }
    solve(Nsr, initDMax, Npop, maxIterations) {
        this.maxIterations = maxIterations;
        this._reset();
        this.population = this.generateInitPopulation(Npop);
        this.intensities = this.calcIntensities(Nsr, Npop - Nsr);
        let dMax = initDMax;
        while (this.currentIteration < maxIterations) {
            this.iterations.push(this.population);
            this.flowStreamsToRiversAndSea(Nsr);
            this.flowRiversToSea(Nsr);
            this.evaporateAndRain(Nsr, dMax);
            dMax = dMax - dMax / maxIterations;
            this.currentIteration++;
        }
        this.iterations.push(this.population);
        return this.population[0];
    }
}
exports.WCASolver = WCASolver;
