import axios from 'axios';
import * as cheerio from 'cheerio';

const mainURL = 'https://www.formula1.com/en/results/jcr:content/resultsarchive.html'

interface IRaceResult {
    grandPrix: string,
    date: Date,
    winner: string,
    car: string
    laps: number,
    time: string,
}

async function getRaceResultByYear(year: string): Promise<IRaceResult[]> {
    const raceResult: IRaceResult[] = [];
    const htmlResponse = await axios.get(`${mainURL}/${year}/races.html`);
    const $ = cheerio.load(htmlResponse.data, null, true);
    $('.resultsarchive-table > tbody > tr').each((i, e) => {
        raceResult.push({
            grandPrix: $(e).find(`td:eq(1)`).text().trim(),
            date: new Date($(e).find(`td:eq(2)`).text().trim()),
            winner: $(e).find(`td:eq(3) span:eq(0)`).text().trim() + ' ' + $(e).find(`td:eq(3) span:eq(1)`).text().trim(),
            car: $(e).find(`td:eq(4)`).text().trim(),
            laps: Number($(e).find(`td:eq(5)`).text()),
            time: $(e).find(`td:eq(6)`).text().trim(),
        });
    });
    
    return raceResult;
}

export {
    getRaceResultByYear,
}