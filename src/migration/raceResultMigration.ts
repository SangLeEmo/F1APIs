import { getRaceResultByYear } from "../api/formularOneAPI";
import connectDB from "../database";
import RaceResult from "../model/raceResult";
import * as dotenv from "dotenv";
import * as readline from 'readline';

const QUESTION_CONFIRM = 'Confirm to migrate? [yes/no]:';

// Load .env if it has
dotenv.config();

async function confirmMigrate() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    return new Promise((resolve: any) => {
        rl.question(`${QUESTION_CONFIRM} `, answer => {
            rl.close();
            console.log(`${QUESTION_CONFIRM} ${answer}`);
            resolve(['yes', 'y'].includes(answer.toLowerCase()));
        });
    });
}

async function migration() {
    try {
        await connectDB();
        const yearFrom = 1950;
        const yearTo = new Date().getUTCFullYear();

        console.log(`Migrate F1 Race Results from ${yearFrom} to ${yearTo}`);
        
        if(!await confirmMigrate()) {
            console.log("Exit without migration");
            return;
        }

        for (let yearGetter = yearFrom; yearGetter <= yearTo; yearGetter += 1) {
            const formulaOneRaceResults = await getRaceResultByYear(yearGetter.toString());

            await Promise.all(formulaOneRaceResults.map(async (rResult) => {
                const existRaceResult = await RaceResult.findOneAndUpdate({ year: yearGetter, grandPrix: rResult.grandPrix }, {
                    date: rResult.date,
                    winner: rResult.winner,
                    team: rResult.car,
                    laps: rResult.laps,
                    time: rResult.time,
                })
                if (existRaceResult) return console.log("Update:", Object.values(rResult).join(' '));
                return existRaceResult || await RaceResult.create({
                    year: yearGetter,
                    grandPrix: rResult.grandPrix,
                    date: rResult.date,
                    winner: rResult.winner,
                    team: rResult.car,
                    laps: rResult.laps,
                    time: rResult.time,
                }).then((newRaceResult) => {
                    console.log("Create:", Object.values(rResult).join(' '));
                    return;
                })
            }));
        }
        console.log("Migration completed!");
        process.exit(0);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

migration();