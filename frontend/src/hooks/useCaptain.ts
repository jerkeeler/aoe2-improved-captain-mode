import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { Role } from '@icm/shared/types';

const useCaptain = (role: Role) => {
  const { captain1, captain2 } = useSelector(({ drafts: { draftInfo: { captain1, captain2 } } }: RootState) => ({
    captain1,
    captain2,
  }));
  if (role === Role.CAPTAIN_1) return captain1;
  return captain2;
};

export default useCaptain;
