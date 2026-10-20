import { randomInt } from 'crypto';
import fs from 'fs';
import chalk from 'chalk';
import prompts from 'prompts';

let outputLog = [];

function logAndPrint(message, printToConsole = true) {
    if (printToConsole) {
        console.log(message);
    }
    outputLog.push(message);
}

async function startGame() {
    const SECRET_NUMBER = randomInt(1, 11);
    const MAX_ATTEMPTS = 3;                 
    let hasWon = false;

    logAndPrint(chalk.magenta.bold("GUESS THE NUMBER!"));
    logAndPrint(chalk.white("Guess a number between 1 and 10."));
    logAndPrint(chalk.yellow(`You have ${MAX_ATTEMPTS} attempts!\n`));

    for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
        let validGuess = false;
        let guessValue;

        while (!validGuess) {
            try {
                const response = await prompts({
                    type: 'text',
                    name: 'guess',
                    message: `Attempt ${attempt}/${MAX_ATTEMPTS}: Enter your guess`
                });

                if (response.guess === undefined) {
                    logAndPrint(chalk.red("\nGame aborted by user."));
                    process.exit(0);
                }

                const rawInput = response.guess;

                // Requirement 7a[cite: 1]
                if (rawInput.trim() === "") {
                    throw new Error("A guess is required.");
                }

                const trimmedStr = rawInput.trim();
                if (isNaN(trimmedStr)) {
                    throw new Error("Guess must be a valid number.");
                }

                guessValue = Number(trimmedStr);

                if (!Number.isInteger(guessValue)) {
                    throw new Error("Guess must be a whole integer.");
                }

                if (guessValue < 1) {
                    throw new Error("Guess must be at least 1.");
                }

                if (guessValue > 10) {
                    throw new Error("Guess cannot exceed 10.");
                }

                validGuess = true; 
            } catch (error) {
                logAndPrint(chalk.red(error.message));
            }
        }

        if (guessValue === SECRET_NUMBER) {
            logAndPrint(chalk.green(`\nCongratulations! You guessed the secret number ${SECRET_NUMBER}!`));
            hasWon = true;
            break;
        } else if (guessValue < SECRET_NUMBER) {
            logAndPrint(chalk.yellow("Too low!\n"));
        } else {
            logAndPrint(chalk.yellow("Too high!\n"));
        }
    }

    if (!hasWon) {
        logAndPrint(chalk.red.bold("GAME OVER!"));
        logAndPrint(chalk.white(`The secret number was ${SECRET_NUMBER}.\n`));
    }

    logAndPrint(chalk.magenta("Thanks for playing!"));

    fs.writeFileSync('game-output.log', outputLog.join('\n'));
}

startGame();