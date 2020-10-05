import { NowRequest, NowResponse } from '@vercel/node';


export const addCORS = (req: NowRequest, res: NowResponse) => {
  const origin = req.headers.origin;
  if (origin &&
    (origin.includes('localhost') || origin.includes('pwa-podcatcher'))
  ) {
    res.setHeader('Vary', 'Origin');
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
};
