#!/usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
// classes player and opponent
class Player {
    name;
    fuel = 100;
    constructor(name) {
        this.name = name;
    }
    fuelDecrease() {
        let fuel = this.fuel - 25;
        this.fuel = fuel;
    }
    fuelIncrease() {
        let fuel = this.fuel + 25;
        this.fuel = fuel;
    }
}
class Opponent {
    name;
    fuel = 100;
    constructor(name) {
        this.name = name;
    }
    fuelDecrease() {
        let fuel = this.fuel - 25;
        this.fuel = fuel;
    }
}
// player name and opponent select
let player = await inquirer.prompt({
    type: "input",
    name: "name",
    message: "Please Enter your name:"
});
let opponent = await inquirer.prompt({
    type: "list",
    name: "select",
    message: "Select your opponent",
    choices: ["skeleton", "Assassin", "Zombie"]
});
console.log(`${chalk.bold.bgBlueBright(player.name)} VS ${chalk.bold.bgCyanBright(opponent.select)}`);
// Gather data
let p1 = new Player(player.name);
let o1 = new Opponent(opponent.select);
do {
    if (opponent.select == "skeleton" || opponent.select === "Alien" || opponent.select === "Zombie") {
        let ask = await inquirer.prompt({
            type: "list",
            name: "option",
            message: "Select your Opponent",
            choices: ["Attack", "Drink portion", "Run For your life.."],
        });
        if (ask.option == "Attack") {
            let num = Math.floor(Math.random() * 2);
            if (num <= 0) {
                p1.fuelDecrease();
                console.log(chalk.bold.red(`${p1.name}'s fuel is ${p1.fuel}`));
                console.log(chalk.bold.green(` ${o1.name}'s fuel is ${o1.fuel}`));
                if (p1.fuel <= 0) {
                    console.log(chalk.bold.red(`${p1.name} Lose! Better luck next time.`));
                    process.exit();
                }
                ;
            }
            ;
            if (num > 0) {
                o1.fuelDecrease();
                console.log(chalk.bold.red(`${o1.name} fuel is ${o1.fuel}`));
                console.log(chalk.bold.green(`${p1.name} fuel is ${p1.fuel}`));
                if (o1.fuel <= 0) {
                    console.log(chalk.bold.green(`Congratulations ${p1.name}! You Win.`));
                    process.exit(0);
                }
                ;
            }
            ;
        }
        ;
        if (ask.option == "Drink portion") {
            p1.fuelIncrease();
            console.log(`${p1.name}'s fuel is ${chalk.bold.bgBlueBright(p1.fuel)}`);
        }
        if (ask.option === "Run For your life..") {
            console.log(chalk.bold.red(`${p1.name} Lose! Better luck next time.`));
            process.exit();
        }
        ;
    }
    ;
} while (true);
