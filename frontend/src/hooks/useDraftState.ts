import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { Draft, Role } from '@icm/shared/types';

const useDraftState = () => {
  const draftState = useSelector(
    ({ data: { captainName }, drafts: { draftInfo, activeDraftToken, activeDraftConfig, role } }: RootState) => ({
      name: captainName,
      draftInfo,
      draftToken: activeDraftToken as string,
      draftConfig: activeDraftConfig as Draft,
      role: role as Role,
    }),
  );
  return draftState;
};

export default useDraftState;
