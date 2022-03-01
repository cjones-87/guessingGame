function generateWinningNumber() {
  let randomNumber = Math.floor(Math.random() * 100) + 1;
  return randomNumber;
}

function shuffle(anArray) {
  let remainingElementsToBeShuffled = anArray.length,
    temp,
    index;
  while (remainingElementsToBeShuffled) {
    index = Math.floor(Math.random() * remainingElementsToBeShuffled--);
    temp = anArray[remainingElementsToBeShuffled];
    anArray[remainingElementsToBeShuffled] = anArray[index];
    anArray[index] = temp;
  }
  return anArray;
}

class Game {
  constructor() {
    this.playersGuess = null;
    this.pastGuesses = [];
    this.winningNumber = generateWinningNumber();
  }
  difference() {
    return Math.abs(this.playersGuess - this.winningNumber);
  }
  isLower() {
    if (this.playersGuess < this.winningNumber) {
      return true;
    } else {
      return false;
    }
  }
  playersGuessSubmission(num) {
    if (num < 1 || isNaN(num) || num > 100) {
      throw `That is an invalid guess.`;
    }
    this.playersGuess = num;
    return this.checkGuess();
  }
  checkGuess() {
    let gameFeedbackText = '';
    if (this.playersGuess === this.winningNumber) {
      this.pastGuesses.push(this.playersGuess);
      gameFeedbackText = 'You Win!';
    } else if (this.pastGuesses.includes(this.playersGuess)) {
      gameFeedbackText = 'You have already guessed that number.';
    } else {
      this.pastGuesses.push(this.playersGuess);

      if (this.pastGuesses.length === 5) {
        gameFeedbackText = 'You Lose.';
      } else if (this.difference() < 10) {
        gameFeedbackText = "You're burning up!";
      } else if (this.difference() < 25) {
        gameFeedbackText = "You're lukewarm.";
      } else if (this.difference() < 50) {
        gameFeedbackText = "You're a bit chilly.";
      } else if (this.difference() < 100) {
        gameFeedbackText = "You're ice cold!";
      }
    }

    document.querySelector(
      `.guessesSoFar li:nth-child(${this.pastGuesses.length})`
    ).innerHTML = this.playersGuess;

    return gameFeedbackText;
  }

  provideHint() {
    let arrayOfHints = [];
    arrayOfHints.push(this.winningNumber);
    while (arrayOfHints.length < 10) {
      if (
        generateWinningNumber() !== this.winningNumber &&
        arrayOfHints.indexOf(generateWinningNumber() === -1)
      ) {
        arrayOfHints.push(generateWinningNumber());
      }
    }
    return shuffle(arrayOfHints);
  }
}

function newGame() {
  return new Game();
}

function playGuessingGame() {
  const newGuessingGame = newGame();
  const presumptionButton = document.getElementById('presumptionButton');
  const hintButton = document.getElementById('hint');

  presumptionButton.addEventListener('click', function () {
    const playersGuess = +document.querySelector('input').value;
    document.querySelector('input').value = '';

    let currentFeedbackText =
      newGuessingGame.playersGuessSubmission(playersGuess);

    const output = document.getElementById('output');
    output.innerHTML = currentFeedbackText;

    if (output.innerHTML === 'You Win!' || output.innerHTML === 'You Lose.') {
      presumptionButton.disabled = true;
    }
  });

  const hint1 = document.getElementById('hint1');
  const hint2 = document.getElementById('hint2');
  const hint3 = document.getElementById('hint3');
  const hint4 = document.getElementById('hint4');
  const hint5 = document.getElementById('hint5');
  const hint6 = document.getElementById('hint6');
  const hint7 = document.getElementById('hint7');
  const hint8 = document.getElementById('hint8');
  const hint9 = document.getElementById('hint9');
  const hint10 = document.getElementById('hint10');

  hintButton.addEventListener('click', function () {
    let gameHint = newGuessingGame.provideHint();
    hint1.innerHTML = gameHint[0];
    hint2.innerHTML = gameHint[1];
    hint3.innerHTML = gameHint[2];
    hint4.innerHTML = gameHint[3];
    hint5.innerHTML = gameHint[4];
    hint6.innerHTML = gameHint[5];
    hint7.innerHTML = gameHint[6];
    hint8.innerHTML = gameHint[7];
    hint9.innerHTML = gameHint[8];
    hint10.innerHTML = gameHint[9];

    hintButton.disabled = true;
  });
}

playGuessingGame();
