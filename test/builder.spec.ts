import SearchBuilder from '../src/SearchBuilder';
import { celesteOmega } from './stubs';

describe('Test the builder', () => {
  const builder = new SearchBuilder();

  function stringTest(track: string, level: number, text?: string) {
    expect(typeof track).toEqual('string');
    if (text) {
      expect(track).toContain(`"${text}"`);
      expect(track).toContain('OR');
    }
    expect(track).toContain(`Lv${level}`);
  }

  it('test with English string', () => {
    const track = builder.track(celesteOmega.complete.en);
    stringTest(track, celesteOmega.level, celesteOmega.complete.en);
  });
  it('test with Japanese string', () => {
    const track = builder.track(celesteOmega.complete.jp);
    stringTest(track, celesteOmega.level);
  });
  it('test with object', () => {
    let track = builder.track({
      level: celesteOmega.level,
      name: celesteOmega.name
    });
    stringTest(track, celesteOmega.level, celesteOmega.complete.en);

    // test with jp only name
    track = builder.track({
      name: {
        jp: celesteOmega.name.jp
      }
    });
    stringTest(track, celesteOmega.level);
  });
});
