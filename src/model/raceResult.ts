import { Schema, model } from "mongoose";

interface IRaceResultByYear {
    year: number,
    grandPrix: string,
    date: Date,
    winner: string,
    team: string
    laps: number,
    time: string,
}

const raceResultSchema = new Schema<IRaceResultByYear>({
    year: {type: Number, required: true},
    grandPrix: {type: String, required: true},
    date: {type: Date, required: true},
    winner: {type: String, required: true},
    team: {type: String, required: true},
    laps: {type: Number},
    time: {type: String},
})

const RaceResult = model<IRaceResultByYear>('race_result_year', raceResultSchema);

export default RaceResult;