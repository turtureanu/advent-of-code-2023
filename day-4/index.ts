import fs from 'fs';

const Solve = (filePath = 'input') => {
  let firstSum = 0;
  let secondSum = 0;

  fs.readFile(filePath, 'utf-8', (err, fileContents) => {
    if (err) {
      console.error(err);
      return;
    }

    const cards: { [card: number]: number[][] } = {};
    const winCards: { [card: number]: number } = {};

    // Break the file contents into lines (\n) and iterate over each line
    fileContents.split('\n').forEach((line, lineIndex) => {
      if (line) {
        let winning = /(?!\d+:)(\d+)(?=.*\|)/g;
        let ours = /(\W?\d+\W?)(?!.*\|)/g;

        // Initialize arrays
        // Structure of cards: "cardNumber": [[winningNumbers], [ourNumbers]]
        cards[lineIndex + 1] = [];
        cards[lineIndex + 1][0] = [];
        cards[lineIndex + 1][1] = [];

        // Append winning numbers to cards {}
        line.match(winning)?.map(e => {
          e.replace(' ', '');
          cards[lineIndex + 1][0].push(parseInt(e));
        })

        // Append ourNumbers to cards {}
        line.match(ours)?.map(e => {
          e.replace(' ', '');
          cards[lineIndex + 1][1].push(parseInt(e));
        })
      }
    });

    for (const [cardNumber, [winning, ours]] of Object.entries(cards)) {
      let cardSum = 0;
      let matches = 0; // Numbers of matching numbers (ours, winning)

      winning.map(winNum => {
        ours.map(ourNum => {
          if (winNum === ourNum) {
            if (cardSum) {
              cardSum *= 2;
            } else {
              cardSum = 1;
            }

            matches++;
          }
        })
      })

      winCards[parseInt(cardNumber)] = matches;
      firstSum += cardSum;
    }

    let winCardsArr = [...Object.entries(winCards)];

    // Array for keeping track of how many cards we have for each card number
    let cardCount: number[] = [];

    for (let _ in winCardsArr) {
      cardCount.push(1);
    }

    // Iterate over all cards
    for (let i = 0; i < winCardsArr.length; i++) {
      // Iterate over all the matching numbers of a card
      for (let j = 0; j < cardCount[i]; j++) {
        // Iterate over all the following cards and increment their cardCount
        for (let k = 1; k <= winCardsArr[i][1]; k++) {
          cardCount[i + k]++;
        }
      }
    }

    // Iterate over all cards and add their card count to the sum
    cardCount.map(e => secondSum += e);

    console.log(`Part 1: ${firstSum}`);
    console.log(`Part 2: ${secondSum}`);
  });

};

Solve();