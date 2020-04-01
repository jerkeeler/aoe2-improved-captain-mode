import React, { useState, useEffect, ReactNode } from 'react';
import { useDispatch } from 'react-redux';

import { getMaps, getCivs, getNames, getDraftPresets } from '../store/dataSlice';
import { AppDispatch } from '../store';

interface Props {
  children: ReactNode
}

const loadData = (setLoading: (loading: boolean) => void, dispatch: AppDispatch) => () => {
  (async function() {
    await Promise.all([
      dispatch(getMaps()),
      dispatch(getCivs()),
      dispatch(getNames()),
      dispatch(getDraftPresets()),
    ]);
    setLoading(false);
  })();
};

const DataPrefetch = ({ children }: Props) => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  useEffect(loadData(setLoading, dispatch), []);

  return loading ? <main><p>loading...</p></main> : <>{children}</>;
};

export default DataPrefetch;
