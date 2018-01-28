import BossFilter, {parse as parseToFilter} from './BossFilter';

export default class SearchBuilder {
  public track(boss: BossFilter | string): string {
    boss = parseToFilter(boss);
    const track: string[] = [];
    const levels = (boss.levels || [boss.level]).map((level) => 'Lv' + level);
    if (boss.name.en && boss.level) { 
      track.push(`Lvl ${boss.level} ${boss.name.en}`); 
    }
    if (boss.name.jp && boss.level) { 
      track.push(`Lv${boss.level} ${boss.name.jp}`); 
    }
    return track.join(',');
  }
}
