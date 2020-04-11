import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { Role } from '@icm/shared/types';

import useCaptain from './useCaptain';

const useOtherCaptain = () => {
  const { role } = useSelector(({ drafts: { role } }: RootState) => ({
    role: role as Role,
  }));
  let otherCap = Role.CAPTAIN_1;
  if (role === Role.CAPTAIN_1) otherCap = Role.CAPTAIN_2;
  return useCaptain(otherCap);
};

export default useOtherCaptain;
