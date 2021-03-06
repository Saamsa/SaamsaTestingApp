import memCache from 'memory-cache';
import * as express from 'express';

const cache =
  (duration: number) =>
  (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): void => {
    const key = `__express__${req.originalUrl || req.url}`;
    const cachedBody = memCache.get(key);

    res.locals.sendResponse = (body: string[]) => {
      memCache.put(key, body, duration * 1000);
      return res.send(body);
    };

    if (cachedBody) {
      res.send(cachedBody);
      return;
    }
    return next();
  };

export default cache;
// Type '(body: []) => void' is not assignable to type 'Send<any, Response<any, Record<string, any>>>'.
//   Type 'void' is not assignable to type 'Response<any, Record<string, any>>'.
