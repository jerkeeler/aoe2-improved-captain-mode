import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';

import DataPrefetch from './components/DataPrefetch';
import Host from './pages/host';
import Home from './pages/home';
import Draft from './pages/draft';
import store from './store';

const Root = () => (
  <Provider store={store}>
    <DataPrefetch>
      <BrowserRouter>
        <Route path="/" exact component={Home} />
        <Route path="/host" component={Host} />
        <Route path="/draft/:draftToken" component={Draft} />
      </BrowserRouter>
    </DataPrefetch>
  </Provider>
);

export default Root;
