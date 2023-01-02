const numOfCities = 20;

const distances: Array<Array<number>> = [];

for (let i = 0; i < numOfCities; i++) {
  const newCity: Array<number> = [];
  for (let j = 0; j < numOfCities; j++) {
    newCity.push(0);
  }
  distances.push(newCity);
}

for (let i = 0; i < numOfCities; i++) {
  for (let j = 0; j < numOfCities; j++) {
    const newRandom = Math.floor(Math.random() * 300);
    if (i !== j) {
      distances[i][j] = newRandom;
      distances[j][i] = newRandom;
    }
  }
}

console.log(distances);
