import { Request, Response } from "express";
import { getRaceResultByYear } from "../api/formularOneAPI";

async function getFOneRaceResultByYear(req: Request, res: Response) {
    try {
        const { year } = req.query;
        const yearGetter = year ? String(year) : new Date().getUTCFullYear().toString();
        const formulaOneRaceResults = await getRaceResultByYear(yearGetter);
        res.json({ data: formulaOneRaceResults })
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal server error');
    }
}

export {
    getFOneRaceResultByYear,
}