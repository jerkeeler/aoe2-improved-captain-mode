import { Captains, Role } from '@icm/shared/types';

export const roleToCaptain = (role: Role) => {
  if (role === Role.CAPTAIN_1) return Captains.CAP_1;
  return Captains.CAP_2;
};
