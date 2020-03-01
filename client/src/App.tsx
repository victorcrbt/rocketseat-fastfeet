import React, { useState } from 'react';
import { ThemeProvider, DefaultTheme } from 'styled-components';
import { Router } from 'react-router-dom';

import Routes from './routes';

import history from './services/history';

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
    <Router history={history}>
      <ThemeProvider theme={theme}>
        <Routes />

        <GlobalStyles />
      </ThemeProvider>
    </Router>
  );
}

export default App;
