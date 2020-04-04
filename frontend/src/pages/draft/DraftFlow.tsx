import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Role } from '@icm/shared/types';

import RoleModal from './RoleModal';
import NameChooser from '../../components/NameChooser';
import Draft from './Draft';
import { RootState } from '../../store';

const DraftFlow = () => {
  // source data
  const [roleChosen, setRoleChosen] = useState(false);
  const { nameConfirmed, role } = useSelector(({ data: { nameConfirmed }, drafts: { role } }: RootState) => ({
    nameConfirmed,
    role,
  }));

  if (!roleChosen) return <RoleModal show={!roleChosen} handleClose={() => setRoleChosen(true)} />;

  if (role === Role.CAPTAIN && !nameConfirmed) return <NameChooser show={!nameConfirmed} hideCancel={true} />;

  return <Draft />;
};

export default DraftFlow;
