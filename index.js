import chalk from 'chalk';
import prompts from 'prompts';

async function startGame() {
    // Display title and instructions 
    console.log(chalk.magenta.bold("GUESS THE NUMBER!"));
    console.log(chalk.white("Guess a number between 1 and 10."));
    console.log(chalk.yellow("You have 3 attempts!\n"));

    // Basic prompt setup
    const response = await prompts({
        type: 'text',
        name: 'guess',
        message: 'Attempt 1/3: Enter your guess'
    });

    console.log(`Your guess was: ${response.guess}`);
}

startGame();