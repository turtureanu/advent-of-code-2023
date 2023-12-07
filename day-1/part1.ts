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
      let firstDigit, secondDigit;

      // Iterate over each character of the line
      for (let i = 0; i < line.length; i++) {
        const c = line[i];

        // Check if the character is a number using ASCII
        if (c.charCodeAt(0) >= 48 && c.charCodeAt(0) <= 57) {
          if (firstDigit === undefined) {
            firstDigit = parseInt(c);
          } else {
            secondDigit = parseInt(c);
          }
        }
      }

      // If there is only one number in the whole line, assign it to `secondDigit` as well
      if (secondDigit === undefined) {
        secondDigit = firstDigit;
      }

      // The line has at least one number (otherwise both digits are `undefined`)
      if (firstDigit !== undefined) {
        sum += parseInt(`${firstDigit}${secondDigit}`);
      }
    });

    console.log(`Part 1: ${sum}`);
  });
};

Solve();