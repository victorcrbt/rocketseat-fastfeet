import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import Home from '~/pages/Home';
import SignIn from '~/pages/SignIn';

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} isPrivate />

      <Route path="/login" component={SignIn} />
    </Switch>
  );
};

export default Routes;
