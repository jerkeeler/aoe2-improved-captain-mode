import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Role } from '@icm/shared/types';

import Modal from '../../../components/Modal';
import { setRole } from '../../../store/draftSlice';
import { RootState } from '../../../store';

import styles from './RoleModal.module.css';

interface Props {
  handleClose: () => void;
  show: boolean;
}

const CannotJoin = () => {
  const { activeDraftToken } = useSelector(({ drafts: { activeDraftToken } }: RootState) => ({ activeDraftToken }));
  return (
    <Modal show={true}>
      <p>Draft {activeDraftToken} is not joinable! It has already started!</p>
    </Modal>
  );
};

const RoleModal = ({ handleClose, show }: Props) => {
  const { availableRoles } = useSelector(({ drafts: { availableRoles } }: RootState) => ({ availableRoles }));
  const dispatch = useDispatch();

  if (availableRoles.length === 0) return <CannotJoin />;

  const chooseRole = (role: Role) => {
    dispatch(setRole({ role }));
    handleClose();
  };

  const allowCaptain = availableRoles.includes(Role.CAPTAIN);

  return (
    <Modal show={show}>
      <p>In what capacity would you like to join this draft?</p>
      <div className={styles.buttons}>
        {allowCaptain && <button onClick={() => chooseRole(Role.CAPTAIN)}>Captain</button>}
        {!allowCaptain && <span />}
        <button className="outline" onClick={() => chooseRole(Role.SPECTATOR)}>
          Spectator
        </button>
      </div>
    </Modal>
  );
};

export default RoleModal;
