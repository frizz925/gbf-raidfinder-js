import { EventEmitter } from 'events';
import TweetParser from 'gbf-raidfinder-parser';
import Twitter from 'twitter';
import TwitterCredentials from './TwitterCredentials';

type StreamCallback = () => void;

export default class Raidfinder {
  private client: Twitter;

  constructor(credentials: TwitterCredentials) {
    this.client = new Twitter(credentials);
  }

  public stream(callback?: StreamCallback): void | EventEmitter {
    const emitter = new EventEmitter();
    this.client.stream('statuses/filter', {track:''});
  }

}
