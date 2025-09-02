import promp from "./promp.js";
import data from "./data.js";

const HANGMAN = "HANGMAN";
const MAX_WRONG = HANGMAN.length;

const wordObj = data[Math.floor(Math.random() * data.length)];
const word = wordObj.word.toLowerCase();

let wrongGuesses = 0;
let guessedCorrectly = false;

async function runGame() {
  while (wrongGuesses < MAX_WRONG && !guessedCorrectly) {
    if (wrongGuesses === MAX_WRONG - 1) {
      console.log(`Hint: ${wordObj.hint}`);
    }

    const guess = await promp(wordObj.question);

    if (guess.toLowerCase() === word) {
      console.log("Congratulations! You've guessed the word correctly.");
      guessedCorrectly = true;
      return;
    } else {
      wrongGuesses++;
      console.log(HANGMAN.slice(0, wrongGuesses));
    }
  }

  if (!guessedCorrectly) {
    console.log(HANGMAN);
    console.log(`Game over! The word was: ${word}`);
  }
}

runGame();
