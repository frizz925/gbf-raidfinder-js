import BossFilter, { parse } from '../src/BossFilter';
import { MAXIMUM_LEVEL, MINIMUM_LEVEL } from '../src/Constants';
import { celesteOmega } from './stubs';

describe('Test boss filter', () => {
  it('test the parser with English string', () => {
    const parsed = parse(celesteOmega.complete.en);
    expect(parsed.name).toHaveProperty('en', celesteOmega.name.en);
    expect(parsed.level).toEqual(celesteOmega.level);
    expect(parsed.levels).toEqual([celesteOmega.level]);
  });

  it('test the parser with Japanese string', () => {
    const parsed = parse(celesteOmega.complete.jp);
    expect(parsed.name).toHaveProperty('jp', celesteOmega.name.jp);
    expect(parsed.level).toEqual(celesteOmega.level);
    expect(parsed.levels).toEqual([celesteOmega.level]);
  });

  it('test the parser with object', () => {
    let parsed = parse({
      name: celesteOmega.name
    });
    expect(parsed.name).toEqual(celesteOmega.name);
    expect(parsed.levels).toContain(MINIMUM_LEVEL);
    expect(parsed.levels).toContain(MAXIMUM_LEVEL);
    expect(parsed.levels).toContain(celesteOmega.level);

    parsed = parse({
      level: celesteOmega.level,
      name: celesteOmega.name
    });
    expect(parsed.name).toEqual(celesteOmega.name);
    expect(parsed.level).toEqual(celesteOmega.level);
    expect(parsed.levels).toEqual([celesteOmega.level]);
  });
});
