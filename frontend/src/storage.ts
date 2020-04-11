const CAPTAIN_NAME_KEY = 'captainName';

export function getName(): null | string {
  return window.localStorage.getItem(CAPTAIN_NAME_KEY);
}

export function setName(captainName: string) {
  window.localStorage.setItem(CAPTAIN_NAME_KEY, captainName);
}
