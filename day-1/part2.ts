import fs from 'fs';

const Solve = (filePath = 'input') => {
  let sum = 0;

  fs.readFile(filePath, 'utf-8', (err, fileContents) => {
    if (err) {
      console.error(err);
      return;
    }

    // Break the file contents into lines (\n) and iterate over each line
    fileContents.split('\n').forEach((line) => {
      let firstDigit: number, secondDigit: number;

      let numbers: string[] = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];

      // E.g.: one => o1e (solves the eightwo problem)
      numbers.map((e, i) => {
        if (line.indexOf(e) !== -1) {
          line = line.replaceAll(e, `${e[0]}${(i).toString()}${e[e.length - 1]}`);
        }
      });

      // convert words (e.g.: one) to numbers (one => 1)
      numbers.map((e, i) => {
        line = line.replaceAll(e, (i + 1).toString());
      })

      // Iterate over each character of the line
      for (let i = 0; i < line.length; i++) {
        const c = line[i];

        // Check if the character is a number using regex (better than ASCII)
        if (c.match(/\d/)) {
          if (firstDigit! === undefined || firstDigit === 0) {
            firstDigit = parseInt(c);
          } else {
            secondDigit = parseInt(c);
          }
        }
      }

      // If there is only one number in the whole line, assign it to `secondDigit` as well
      if (secondDigit! === undefined) {
        secondDigit = firstDigit!;
      }

      // The line has at least one number (otherwise both digits are `undefined`)
      if (firstDigit! !== undefined) {
        sum += parseInt(`${firstDigit}${secondDigit}`);
      }
    });

    console.log(`Part 2: ${sum}`);
  });
};

Solve();