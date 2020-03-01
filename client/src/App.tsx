import React, { useState } from 'react';
import { ThemeProvider, DefaultTheme } from 'styled-components';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';

import './config/Reactotron';

import Routes from './routes';

import history from './services/history';
import store from './store';

import usePersistTheme from './utils/usePersistTheme';

import light from './styles/themes/light';
import dark from './styles/themes/dark';
import GlobalStyles from './styles/global';

function App() {
  const [theme, setTheme] = usePersistTheme<DefaultTheme>(light);

  const toggleTheme = () => {
    setTheme(theme.title === 'light' ? dark : light);
  };

  return (
    <Provider store={store}>
      <Router history={history}>
        <ThemeProvider theme={theme}>
          <Routes />

          <GlobalStyles />
        </ThemeProvider>
      </Router>
    </Provider>
  );
}

export default App;
