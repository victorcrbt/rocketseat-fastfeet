import React from 'react';
import { Switch, Redirect } from 'react-router-dom';

import Route from './Route';

import Encomendas from '~/pages/Encomendas';
import SignIn from '~/pages/SignIn';

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route exact path="/encomendas" component={Encomendas} isPrivate />

      <Route path="/login" component={SignIn} />
      <Redirect from="/" to="/encomendas" />
    </Switch>
  );
};

export default Routes;
