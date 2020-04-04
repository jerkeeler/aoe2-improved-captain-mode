import React, { useState, useEffect, ReactNode } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router';

import { getDraftInfo } from '../../store/draftSlice';
import Modal from '../../components/Modal';

interface Props {
  children: ReactNode;
}

const DoesNotExist = ({ draftToken }: { draftToken: string }) => {
  const history = useHistory();

  return (
    <Modal show={true}>
      <p>Draft {draftToken} does not exist!</p>
      <button onClick={() => history.push('/')}>To Homepage</button>
    </Modal>
  );
};

const DraftPrefetch = ({ children }: Props) => {
  const { draftToken } = useParams();
  const [loading, setLoading] = useState(true);
  const [doesNotExist, setDoesNotExist] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async function () {
      try {
        await Promise.all([dispatch(getDraftInfo(draftToken as string))]);
        setLoading(false);
      } catch (err) {
        setDoesNotExist(true);
      }
    })();
  }, [draftToken, dispatch]);

  if (doesNotExist) return <DoesNotExist draftToken={draftToken as string} />;

  if (loading)
    return (
      <main>
        <p>loading...</p>
      </main>
    );

  return <>{children}</>;
};

export default DraftPrefetch;
