import { Request, Response } from "express";
import { getRaceResultByYear } from "../api/formularOneAPI";
import { getRaceResults } from "../model/raceResult";

async function testFOneRaceResultByYear(req: Request, res: Response) {
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

async function getFOneRaceResultByYear(req: Request, res: Response) {
  try {
    const limit = undefined === req.query.limit ? 0 : Number(req.query.limit);
    const offset = undefined === req.query.offset ? 0 : Number(req.query.offset);
    const { search, year, date, winner, grandPrix, team, laps, time } = req.query;

    const searchFields = {
      year: (year !== undefined && year !== null) ? Number(year) : null,
      grandPrix: grandPrix ? String(grandPrix).trim() : null,
      date: date ? new Date(String(req.query.date)) : null,
      winner: winner ? String(winner).trim(): null,
      team: team ? String(team).trim(): null,
      laps: (laps !== undefined && laps!== null) ? Number(laps) : null,
      time: time ? String(time).trim(): null,
    }

    const { data, totalCount } = await getRaceResults({
      limit, offset, search, searchFields,
    });
    res.json({ data, totalCount, limit, offset })
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal server error');
  }
}

export {
  testFOneRaceResultByYear,
  getFOneRaceResultByYear,
}