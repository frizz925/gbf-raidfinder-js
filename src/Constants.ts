export const MINIMUM_LEVEL = 20;
export const MAXIMUM_LEVEL = 200;
export const ALL_LEVELS: number[] = [];
export const TWEET_SOURCE = '<a href="http://granbluefantasy.jp/" rel="nofollow">グランブルー ファンタジー</a>';

for (let i = MINIMUM_LEVEL; i <= MAXIMUM_LEVEL; i += 5) {
  ALL_LEVELS.push(i);
}
