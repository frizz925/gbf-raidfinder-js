import BossFilter, {parse as parseToFilter} from './BossFilter';

export default class SearchBuilder {
  public track(boss: BossFilter | string): string {
    const parsed = parseToFilter(boss);
    if (!parsed) {
      throw TypeError("Can't parse the boss filter!");
    }

    const track: string[] = [];
    const levels = (parsed.levels || [parsed.level]).map((level) => 'Lv' + level);
    if (parsed.name.en && parsed.level) { 
      track.push(`Lvl ${parsed.level} ${parsed.name.en}`); 
    }
    if (parsed.name.jp && parsed.level) { 
      track.push(`Lv${parsed.level} ${parsed.name.jp}`); 
    }
    return track.join(',');
  }
}
