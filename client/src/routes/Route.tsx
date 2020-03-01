import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect, RouteProps } from 'react-router-dom';

import { ApplicationState } from '~/store/index';

import AuthLayout from '~/pages/_layout/auth';
import DefaultLayout from '~/pages/_layout/default';

interface Props {
  component: React.FC<RouteProps>;
  isPrivate?: boolean;
}

type RouteWrapperProps = Props & RouteProps;

const RouteWrapper: React.FC<RouteWrapperProps> = ({
  component: Component,
  isPrivate,
  ...rest
}) => {
  const signed = useSelector<ApplicationState>(state => state.auth.isSigned);

  if (!signed && isPrivate) {
    return <Redirect to="/login" />;
  }

  if (signed && !isPrivate) {
    return <Redirect to="/" />;
  }

  const Layout: React.FC = signed ? DefaultLayout : AuthLayout;

  return (
    <Route
      {...rest}
      render={props => (
        <Layout>
          <Component {...props} />
        </Layout>
      )}
    />
  );
};

export default RouteWrapper;
