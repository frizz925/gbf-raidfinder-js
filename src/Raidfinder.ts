import * as deepExtend from 'deep-extend';
import { EventEmitter } from 'events';
import * as TweetParser from 'gbf-raidfinder-parser';
import * as Twitter from 'twitter';
import BossFilter, { parse as parseToFilter } from './BossFilter';
import SearchBuilder from './SearchBuilder';
import TwitterCredentials from './TwitterCredentials';

interface BossParameter {
  [key: string]: string
}

type BossParameters = Array<BossParameter|string> | BossParameter | string;
type StreamCallback = (stream: EventEmitter) => void;

export default class Raidfinder {
  private client: Twitter;
  private builder: SearchBuilder;


  constructor(credentials: TwitterCredentials) {
    this.client = new Twitter(credentials);
    this.builder = new SearchBuilder();
  }

  public stream(bosses: BossParameters, callback?: StreamCallback): void | EventEmitter {
    if (!Array.isArray(bosses)) { bosses = [bosses]; }
    const emitter = new EventEmitter();
    const track = bosses
      .map((boss) => this.parameterToFilter(boss))
      .map((boss) => this.builder.track(boss))
      .join(',');
    return this.client.stream('statuses/filter', {track}, callback);
  }

  protected parameterToFilter(boss: BossParameter | string): BossFilter | string {
    if (typeof boss === 'string') { return boss; }
    const result: BossFilter = {name: {}};
    for (const lang in boss) {
      if (boss.hasOwnProperty(lang)) {
        deepExtend(result, parseToFilter(boss[lang]));
      }
    }
    return result;
  }
}
