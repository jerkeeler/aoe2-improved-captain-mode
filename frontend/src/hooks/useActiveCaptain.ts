import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { Role } from '@icm/shared/types';

import useCaptain from './useCaptain';

const useActiveCaptain = () => {
  const { role } = useSelector(({ drafts: { role } }: RootState) => ({
    role: role as Role,
  }));
  return useCaptain(role);
};

export default useActiveCaptain;
