export function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min)) + min
}

export function randomEl<T>(arr: T[]): T {
  return arr[randomInt(0, arr.length)];
}
