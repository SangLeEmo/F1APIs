import { Router } from 'express';
import {getFOneRaceResultByYear} from '../controller/formulaOne';

const router: Router = Router();


/**
 * @openapi
 * /api/races/list:
 *   get:
 *    tags:
 *      - Get race results of Formula 1
 *    description: Get race results of Formula 1 by year or current year
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
 *                      car:
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