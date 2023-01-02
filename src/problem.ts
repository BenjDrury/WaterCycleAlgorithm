import { Raindrop } from "./raindrop";

export class Problem {
  private problem: (values: Array<number>) => number;
  private minimize: boolean;
  private constraints: Array<(values: Array<number>) => number>;
  private numOfVars: number;
  private lowerBounds: Array<number>;
  private upperBounds: Array<number>;
  private expectedSolution: number;
  private genereateRandomSolution: () => Raindrop;

  constructor(
    problem: (values: Array<number>) => number,
    minimize: boolean,
    constraints: Array<(values: Array<number>) => number>,
    numOfVars: number,
    lowerBounds: Array<number>,
    upperBounds: Array<number>,
    expectedSolution: number,
    genereateRandomSolution?: () => Raindrop,
  ) {
    this.problem = problem;
    this.minimize = minimize;
    this.constraints = constraints;
    this.numOfVars = numOfVars;
    this.lowerBounds = lowerBounds;
    this.upperBounds = upperBounds;
    this.expectedSolution = expectedSolution;
    this.genereateRandomSolution = genereateRandomSolution;
  }

  public get getNumOfVars() {
    return this.numOfVars;
  }

  public get isToMinimize() {
    return this.minimize;
  }

  public get optimum() {
    return this.expectedSolution;
  }

  public get getUB() {
    return this.upperBounds;
  }

  public get getLB() {
    return this.lowerBounds;
  }

  public get getGenerateRandomSolution() {
    return this.genereateRandomSolution;
  }

  public calcCostFor = (values: Array<number>): number => this.problem(values);

  public calcConstraintsCrossFor = (values: Array<number>): number =>
    this.constraints.reduce((prev, constraint) => prev + constraint(values), 0);
}
