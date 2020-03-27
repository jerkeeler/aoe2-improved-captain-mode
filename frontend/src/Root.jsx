import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';

import DataPrefetch from './components/DataPrefetch';
import Host from './pages/Host';
import Home from './pages/Home';
import store from './store';

const Root = () => (
  <Provider store={store}>
    <DataPrefetch>
      <BrowserRouter>
        <Route path="/" exact component={Home} />
        <Route path="/host" component={Host} />
      </BrowserRouter>
    </DataPrefetch>
  </Provider>
);

export default Root;
