import * as dotenv from 'dotenv';
import Raidfinder from '../src/Raidfinder';
import { celesteOmega } from './stubs';

describe('Test raidfinder', () => {
  dotenv.config();

  it('test tweet streaming', (cb) => {
    new Raidfinder({
      access_token_key: process.env.ACCESS_TOKEN,
      access_token_secret: process.env.ACCESS_TOKEN_SECRET,
      consumer_key: process.env.CONSUMER_KEY,
      consumer_secret: process.env.CONSUMER_SECRET
    }).stream(celesteOmega.complete.en, (err, tweet, stream) => {
      stream.destroy();
      cb();
    });
  }, 60000);
});
