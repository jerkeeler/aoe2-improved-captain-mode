import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';

import Home from './pages/Home';
import store from './store';

const Root = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Route path="/" exact component={Home} />
    </BrowserRouter>
  </Provider>
);

export default Root;
