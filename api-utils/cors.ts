import { NowRequest, NowResponse } from '@now/node';


export const addCORS = (req: NowRequest, res: NowResponse) => {
  if (req.headers.referer &&
    (req.headers.referer.includes('localhost') || req.headers.referer.includes('pwa-podcatcher'))
  ) {
    res.setHeader('Vary', 'Origin');
    res.setHeader('Access-Control-Allow-Origin', req.headers.referer);
  }
};
