import BossFilter, {parse as parseFilter} from './BossFilter';

export default class SearchBuilder {
  public track(boss: BossFilter | string): string {
    boss = parseFilter(boss);
    const track: string[] = [];
    const levels = (boss.levels || [boss.level]).map((level) => 'Lv' + level);
    if (boss.name.en && boss.level) { 
      track.push(`"Lvl ${boss.level} ${boss.name.en}"`); 
    }
    return track.concat(levels).join(' OR ');
  }
}
