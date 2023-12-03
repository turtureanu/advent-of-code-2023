import fs from 'fs';

const Solve = (filePath = 'input') => {
  let firstSum = 0, secondSum = 0;
  let gearNumbers: number[][] = [];

  fs.readFile(filePath, 'utf-8', (err, fileContents) => {
    if (err) {
      console.error(err);
      return;
    }

    let schematic: string[][] = [];

    // Break the file contents into lines (\n) and iterate over each line
    fileContents.split('\n').forEach((line) => {
      if (line) {
        schematic.push(line.split(''));
      }
    });

    // Helper functions
    const isDigit = (num: string) => !Number.isNaN(parseInt(num));
    const isSymbol = (symbol: string) => new RegExp(/[^\.\d\s]/).test(symbol);

    // Iterate over the schematic
    for (let i = 0; i < schematic.length; i++) {
      for (let j = 0; j < schematic[i].length; j++) {
        let startDigit: number;

        if (isDigit(schematic[i][j])) {
          let num: string = "";
          startDigit = j;

          // Iterate over the number and add each digit to `num` as a string
          // We can then reconstruct the number we iterated over and add it to the sum
          do {
            num += schematic[i][j];
            j++;
          } while (isDigit(schematic[i][j]))

          // Left check
          if (schematic[i][startDigit - 1] && isSymbol(schematic[i][startDigit - 1])) {
            firstSum += parseInt(num);

            if (schematic[i][startDigit - 1] === "*") {
              gearNumbers.push([parseInt(num), i, startDigit - 1]);
            }

            continue;
          }

          // Right check
          if (schematic[i][j] && isSymbol(schematic[i][j])) {
            firstSum += parseInt(num);

            if (schematic[i][j] === "*") {
              gearNumbers.push([parseInt(num), i, j]);
            }

            continue;
          }

          // Top check
          if (schematic[i - 1]) {
            for (let k = startDigit - 1; k <= j; k++) {
              if (schematic[i - 1][k] && isSymbol(schematic[i - 1][k])) {
                firstSum += parseInt(num);

                if (schematic[i - 1][k] === "*") {
                  gearNumbers.push([parseInt(num), i - 1, k]);
                }

                break;
              }
            }
          }

          // Bottom check
          if (schematic[i + 1]) {
            for (let k = startDigit - 1; k <= j; k++) {
              if (schematic[i + 1][k] && isSymbol(schematic[i + 1][k])) {
                firstSum += parseInt(num);

                if (schematic[i + 1][k] === "*") {
                  gearNumbers.push([parseInt(num), i + 1, k]);
                }

                break;
              }
            }
          }
        }
      }
    }

    const gearMap: { [num: string]: number[] } = {};

    for (const [number, y, x] of gearNumbers) {

      // The key is the gear's coordinates
      const key = `${y}${x}`;

      // If there isn't an entry with the key already, add it as an array
      if (!(key in gearMap)) {
        gearMap[key] = [number];
      } else { // else push the other value to the array
        gearMap[key].push(number);
      }
    }

    // For each coordinate (key), check if there are exactly two numbers (values)
    // and multiply them before adding them to the sum
    for (const numbers of Object.values(gearMap)) {
      if (numbers.length == 2) {
        secondSum += numbers[0] * numbers[1];
      }
    }

    console.log(`Part 1: ${firstSum}`);
    console.log(`Part 2: ${secondSum}`);
  });
};

Solve();