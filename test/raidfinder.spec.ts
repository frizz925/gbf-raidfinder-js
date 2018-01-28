import * as dotenv from 'dotenv';
import Raidfinder from '../src/Raidfinder';
import { celesteOmega } from './stubs';

describe('Test raidfinder', () => {
  dotenv.config();

  function raidfinderTest(cb: jest.DoneCallback) {
    const stream = new Raidfinder({
      access_token_key: process.env.ACCESS_TOKEN,
      access_token_secret: process.env.ACCESS_TOKEN_SECRET,
      consumer_key: process.env.CONSUMER_KEY,
      consumer_secret: process.env.CONSUMER_SECRET
    }).stream(celesteOmega.complete.en);

    if (!stream) {
      return cb.fail("Can't make stream");
    }

    stream.on('data', data => {
      cb();
    });

    stream.on('error', error => {
      cb.fail(error);
    });
  }

  it('test tweet streaming', raidfinderTest, 60000);
});
