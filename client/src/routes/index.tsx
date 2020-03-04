import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import Deliveries from '~/pages/Deliveries';
import SignIn from '~/pages/SignIn';

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/login" component={SignIn} />

      <Route path="/encomendas" component={Deliveries} isPrivate />

      <Route exact path="/" component={Deliveries} />
    </Switch>
  );
};

export default Routes;
