import promp from "./promp.js";
import data from "./data.js";

const HANGMAN = "HANGMAN";
const MAX_WRONG = HANGMAN.length;

const wordObj = data[Math.floor(Math.random() * data.length)];
const word = wordObj.word.toLowerCase();

let wrongGuesses = 0;
let guessedCorrectly = false;

async function runGame() {
  console.log("🎮 Welcome to Hangman!");
  console.log(`You have ${MAX_WRONG} attempts to guess the word.`);

  while (wrongGuesses < MAX_WRONG && !guessedCorrectly) {
    
    if (wrongGuesses === MAX_WRONG - 1) {
      console.log(`💡 Hint: ${wordObj.hint}`);
    }

    const guess = await promp(wordObj.question + " ");

    if (guess.toLowerCase() === word) {
      console.log(`🎉 Congratulations! You guessed the word correctly: ${word}`);
      guessedCorrectly = true;
      return;
    } else {
      wrongGuesses++;
      console.log(`❌ Wrong guess! Progress: ${HANGMAN.slice(0, wrongGuesses)}`);
      console.log(`Attempts left: ${MAX_WRONG - wrongGuesses}`);
    }
  }

  if (!guessedCorrectly) {
    console.log(`💀 Game over! The word was: ${word}`);
  }
}

runGame();
