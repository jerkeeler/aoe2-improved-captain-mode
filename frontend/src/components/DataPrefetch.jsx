import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { getMaps, getCivs, getNames } from '../store/actions';
import { getDraftPresets } from '../store/drafts/actions';

const loadData = (setLoading, dispatch) => () => {
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

const DataPrefetch = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  useEffect(loadData(setLoading, dispatch), []);

  return loading ? <main><p>loading...</p></main> : <>{children}</>;
};

export default DataPrefetch;
