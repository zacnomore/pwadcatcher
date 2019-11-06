import { Injectable } from '@angular/core';
import * as Parser from 'rss-parser';

@Injectable({
  providedIn: 'root'
})
export class RssReaderService {
  private parser = new Parser();

  async readFeed(url: string) {
    await this.parser.parseURL(url);
  }
}
