import * as Twitter from '@frizz925/twitter';
import * as deepExtend from 'deep-extend';
import * as TweetParser from 'gbf-raidfinder-parser';
import BossFilter, { parse as parseToFilter } from './BossFilter';
import { TWEET_SOURCE } from './Constants';
import SearchBuilder from './SearchBuilder';
import Tweet from './Tweet';
import TwitterCredentials from './TwitterCredentials';

export interface BossParameter {
  [key: string]: string
}

export type BossParameters = Array<BossParameter|string> | BossParameter | string;
export type StreamCallback = (
  error: Error | null, 
  tweet: TweetParser.RaidTweet | null, 
  stream: Twitter.Stream
) => void;

export default class Raidfinder {
  private client: Twitter;
  private builder: SearchBuilder;

  constructor(credentials?: TwitterCredentials) {
    credentials = credentials || this.loadCredentialsFromEnv();
    this.client = new Twitter(credentials);
    this.builder = new SearchBuilder();
  }

  public loadCredentialsFromEnv(): TwitterCredentials {
      return {
        access_token_key: process.env.ACCESS_TOKEN,
        access_token_secret: process.env.ACCESS_TOKEN_SECRET,
        consumer_key: process.env.CONSUMER_KEY,
        consumer_secret: process.env.CONSUMER_SECRET
      };
  }

  public stream(bosses: BossParameters, callback: StreamCallback): Twitter.Stream {
    if (!Array.isArray(bosses)) { bosses = [bosses]; }
    const track = bosses
      .map((boss) => this.parameterToFilter(boss))
      .map((boss) => this.builder.track(boss))
      .join(',');
    const stream = this.client.stream('statuses/filter', {track});
    if (!stream) {
      throw new Error("Can't get the stream emitter!");
    }

    stream.on('data', (tweet: Tweet) => {
      if (this.filter(tweet)) {
        try {
          const parsed = this.parse(tweet);
          callback(null, parsed, stream);
        } catch (err) {
          callback(err, null, stream);
        }
      }
    });

    stream.on('error', error => {
      callback(error, null, stream);
    });

    return stream;
  }

  public filter(tweet: Tweet): boolean {
    return tweet.source === TWEET_SOURCE && TweetParser.isRaidTweet(tweet.text);
  }

  public parse(tweet: Tweet): TweetParser.RaidTweet {
    return TweetParser.parse(tweet.text);
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
