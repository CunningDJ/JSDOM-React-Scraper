import jsdom from 'jsdom';

import { IGetScrapedUrlData } from './scrape.d'

export function scrapeUrlData(url: string): Promise<IGetScrapedUrlData> {
  return new Promise((resolve, reject) => {
    // TODO: Actual logic using JSDOM.fromURL
    const sdata: IGetScrapedUrlData = {};
    return resolve(sdata)
  });
}
