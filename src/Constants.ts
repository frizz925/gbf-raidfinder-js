export const MINIMUM_LEVEL = 20;
export const MAXIMUM_LEVEL = 200;
export const ALL_LEVELS: number[] = []; 

for (let i = MINIMUM_LEVEL; i <= MAXIMUM_LEVEL; i += 5) {
  ALL_LEVELS.push(i);
}
