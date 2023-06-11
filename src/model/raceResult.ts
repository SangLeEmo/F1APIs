import { PipelineStage, Schema, model } from "mongoose";

interface IRaceResultByYear {
  year: number,
  grandPrix: string,
  date: Date,
  winner: string,
  team: string,
  laps: number,
  time: string,
}

const raceResultSchema = new Schema<IRaceResultByYear>({
  year: { type: Number, required: true },
  grandPrix: { type: String, required: true },
  date: { type: Date, required: true },
  winner: { type: String, required: true },
  team: { type: String, required: true },
  laps: { type: Number },
  time: { type: String },
})

const RaceResult = model<IRaceResultByYear>('race_result_year', raceResultSchema);

interface ISearchFields {
    [index: string]: string | number | Date | null,
    year: number | null,
    grandPrix: string | null,
    date: Date | null,
    winner: string | null,
    team: string | null,
    laps: number | null,
    time: string | null,
}
interface IRequestParams {
  limit: number,
  offset: number,
  search?: any,
  searchFields: ISearchFields,
}

const searchAll = (pipeline: PipelineStage[], search: any, fields: string[]) => {
  const returnPipeline: PipelineStage[] = pipeline;
  const matchOr: Object[] = [];
  fields.map(name => {
    if (['date'].includes(name)) {
      const dateQueryObject: Record<string, any> = {};
      dateQueryObject[name] = { $eq: new Date(search) };
      matchOr.push(dateQueryObject);
    }
    if (['winner', 'grandPrix', 'team'].includes(name)) {
      matchOr.push(JSON.parse(`{"${name}": { "$regex": "${search}", "$options": "m" }}`));
    }
    if (Number(search) === 0 || Number(search)) {
      matchOr.push(
        JSON.parse(`{"${name}": { "$eq": ${search} }}`),
      );
    }
    matchOr.push(JSON.parse(`{"${name}": { "$regex": "${search}", "$options": "i" }}`));
    return name;
  });

  if (matchOr.length > 0) {
    returnPipeline.push({
      $match: {
        $or: matchOr,
      },
    });
  }

  return returnPipeline;
}

const searchCombine = (
  pipeline: PipelineStage[],
  searchOnColumns: ISearchFields,
) => {
  const returnPipeline: PipelineStage[] = [...pipeline];
  const fields = Object.keys(searchOnColumns);
  const matchAnd: Object[] = [];
  fields.map(name => {
    if (!searchOnColumns[name]) return name;
    if (['date'].includes(name) && searchOnColumns[name] !== null) {
      const queryObject: Record<string, any> = {};
        queryObject[name] = { $eq: new Date(String(searchOnColumns[name])) };
        matchAnd.push(queryObject);
      return name;
    }
    if (['winner', 'grandPrix', 'team'].includes(name) && searchOnColumns[name] !== null) {
      matchAnd.push(JSON.parse(`{"${name}": { "$regex": "${searchOnColumns[name]}", "$options": "i" }}`));
      return name;
    }
    if (Number(searchOnColumns[name]) === 0 || Number(searchOnColumns[name])) {
      matchAnd.push(
        JSON.parse(`{"${name}": { "$eq": ${searchOnColumns[name]} }}`),
      );
      return name;
    }
    matchAnd.push(JSON.parse(`{"${name}": { "$regex": "${searchOnColumns[name]}", "$options": "i" }}`));
    return name;
  });

  if (matchAnd.length > 0) {
    returnPipeline.push({
      $match: {
        $and: matchAnd,
      },
    });
  }
  return returnPipeline;
}

const getRaceResults = async (params: IRequestParams) => {
  let pipeline: PipelineStage[] = [];
  if (params.search) {
    pipeline = searchAll(pipeline, params.search, ['date', 'winner', 'grandPrix', 'team', 'laps', 'time'])
  } else {    
    pipeline = searchCombine(pipeline, params.searchFields)
  }  
  const totalCount = await RaceResult.aggregate(pipeline).count('totalCount').exec();

  pipeline.push({
    $sort: { 'year': -1 }
  }, {
    $skip: params.offset
  }, {
    $limit: params.limit
  })
  
  const data = await RaceResult.aggregate(pipeline).exec();
  return { data, totalCount: totalCount[0]?.totalCount || 0 };
}

export default RaceResult;

export {
  getRaceResults,
}