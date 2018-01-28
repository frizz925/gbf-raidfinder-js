import { Boss } from 'gbf-raidfinder-parser';
import { ALL_LEVELS } from './Constants';

export default interface BossFilter {
  level?: number;
  levels?: number[];
  name: {
    [key: string]: string,
  }
}

function parseFromFilter(boss: BossFilter): Boss {
  let name = null;
  if (typeof boss.name === 'string') {
    name = boss.name;
  } else if (typeof boss.name === 'object') {
    const language = Object.keys(boss.name).pop();
    if (language) { name = boss.name[language]; }
  }
  if (!name) {
    throw new TypeError('Can\'t determine the boss name!');
  }
  return new Boss(name);
}

export function parse(boss: BossFilter | string): BossFilter {
  if (typeof boss === 'object') {
    if (!boss.level) {
      try {
        const parsed = parseFromFilter(boss);
        boss.level = parsed.level;
      } catch (e) {
        boss.levels = boss.levels || ALL_LEVELS;
      }
    }
    if (!boss.levels && boss.level) {
      boss.levels = [boss.level];
    }
  } else {
    const parsed = Boss.parse(boss);
    boss = {
      level: parsed.level,
      levels: [parsed.level],
      name: {
        [parsed.language]: parsed.name
      }
    };
  }
  return boss;
}
