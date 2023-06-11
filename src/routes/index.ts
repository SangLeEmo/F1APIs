import { Router } from 'express';
import {getFOneRaceResultByYear, testFOneRaceResultByYear} from '../controller/formulaOne';

const router: Router = Router();


/**
 * @openapi
 * /api/races/test:
 *   get:
 *    tags:
 *      - TEST race results of Formula 1
 *    description: Get race results direct from Formula 1 by year or current year
 *    parameters:
 *      - name: year
 *        in: query
 *        description: Year of F1
 *        required: false
 *    responses:
 *      200:
 *        description: Returns list of race results by query year.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                data:
 *                  type: array
 *                  items:
 *                    type: object
 *                    properties:
 *                      grandPrix:
 *                        type: string
 *                      date:
 *                        type: string
 *                      winner:
 *                        type: string
 *                      team:
 *                        type: string
 *                      laps:
 *                        type: number
 *                      time:
 *                        type: string
 */
router.get(
  '/races/test',
  testFOneRaceResultByYear,
);

/**
 * @openapi
 * /api/races/list:
 *   get:
 *    tags:
 *      - Get race results scrawled from Formula 1
 *    description: Get race results of Formula 1
 *    parameters:
 *      - name: limit
 *        in: query
 *        required: false
 *        default: 10
 *      - name: offset
 *        in: query
 *        required: false
 *        default: 0
 *      - name: search
 *        in: query
 *        description: Search in all fields of data
 *        required: false
 *      - name: year
 *        in: query
 *        description: search by year value, can combine with other search
 *        required: false
 *      - name: grandPrix
 *        in: query
 *        description: Search by grandPrix, can combine with other search
 *        required: false
 *      - name: date
 *        in: query
 *        description: search by date, can combine with other search
 *        required: false
 *      - name: winner
 *        in: query
 *        description: search by winner, can combine with other search
 *        required: false
 *      - name: team
 *        in: query
 *        description: search by car, can combine with other search
 *        required: false
 *      - name: laps
 *        in: query
 *        description: search by laps, can combine with other search
 *        required: false
 *      - name: time
 *        in: query
 *        description: search by time, can combine with other search
 *        required: false
 *    responses:
 *      200:
 *        description: Returns list of race results by query year.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                limit:
 *                  type: number
 *                offset:
 *                  type: number
 *                totalCount:
 *                  type: number
 *                data:
 *                  type: array
 *                  items:
 *                    type: object
 *                    properties:
 *                      grandPrix:
 *                        type: string
 *                      date:
 *                        type: string
 *                      winner:
 *                        type: string
 *                      team:
 *                        type: string
 *                      laps:
 *                        type: number
 *                      time:
 *                        type: string
 */
router.get(
  '/races/list',
  getFOneRaceResultByYear,
);

export default router;