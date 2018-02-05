import * as dotenv from 'dotenv';
import Raidfinder from '../src/Raidfinder';
import { celesteOmega } from './stubs';

describe('Test raidfinder', () => {
  dotenv.config();

  it('test tweet streaming', (cb) => {
    new Raidfinder().stream([
      celesteOmega.complete.en,
      celesteOmega.complete.jp
     ], (err, tweet, stream) => {
      stream.destroy();
      cb();
    });
  }, 60000);
});
