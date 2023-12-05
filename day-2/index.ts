import fs from 'fs';

const Solve = (filePath = 'input') => {
  let firstSum = 0, secondSum = 0;

  fs.readFile(filePath, 'utf-8', (err, fileContents) => {
    if (err) {
      console.error(err);
      return;
    }

    // Break the file contents into lines (\n) and iterate over each line
    fileContents.split('\n').forEach((line) => {

      // Don't check empty lines
      if (line) {
        let gameID = parseInt(String(line.match(new RegExp(/\d+/))));

        // Delete `Game \d+:` string
        line = line.replace(/Game \d+:/, "");

        // Create game sets
        let gameSets = line.match(new RegExp(/ ([^;]+)/g));

        let isPossible: boolean = true;

        // Iterate over each game set
        let minRed = 0, minGreen = 0, minBlue = 0;

        gameSets?.map((set) => {
          let red = 0, green = 0, blue = 0;

          // Get red value
          set.match(new RegExp(/\d+(?=.red)/g))?.forEach(e => {
            red += parseInt(e);
          });

          // Get green value
          set.match(new RegExp(/\d+(?=.green)/g))?.forEach(e => {
            green += parseInt(e);
          });

          // Get blue value
          set.match(new RegExp(/\d+(?=.blue)/g))?.forEach(e => {
            blue += parseInt(e);
          });

          // If any of the sets are impossible, set `isPossible` to false
          if (red > 12 || green > 13 || blue > 14) {
            isPossible = false;
          }

          if (red > minRed) {
            minRed = red;
          }

          if (green > minGreen) {
            minGreen = green;
          }

          if (blue > minBlue) {
            minBlue = blue;
          }

        });

        // If `isPossible` remains true, add the gameID to the sum
        if (isPossible) {
          firstSum += gameID;
        }

        secondSum += minRed * minGreen * minBlue;
      }
    });

    console.log(`Part 1: ${firstSum}`);
    console.log(`Part 2: ${secondSum}`);
  });
}

Solve();