import { NowRequest, NowResponse } from '@now/node';
import { addCORS } from '../api-utils/cors';
import { simpleRequest } from '../api-utils/simple';

export default async (req: NowRequest, res: NowResponse) => {
  const {
    query: { audioUrl }
  } = req;

  const audio = await simpleRequest(audioUrl.toString());
  addCORS(req, res);
  res.send(audio);
};

