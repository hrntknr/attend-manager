import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter, Switch, Route} from 'react-router-dom';
import Index from './pages/index.jsx';

ReactDOM.render(
  <HashRouter>
    <Switch>
      <Route path='/' component={Index} exact />
    </Switch>
  </HashRouter>,
  document.getElementById('app')
)
