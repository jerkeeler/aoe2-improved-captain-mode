import React, { useState, useEffect, ReactNode } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';

import { getDraftInfo } from '../../store/draftSlice';

interface Props {
  children: ReactNode;
}

const DraftPrefetch = ({ children }: Props) => {
  const { draftToken } = useParams();
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    (async function () {
      await Promise.all([dispatch(getDraftInfo(draftToken as string))]);
      setLoading(false);
    })();
  }, [draftToken, dispatch]);

  if (loading)
    return (
      <main>
        <p>loading...</p>
      </main>
    );

  return <>{children}</>;
};

export default DraftPrefetch;
