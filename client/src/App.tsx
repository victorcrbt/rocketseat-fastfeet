import React, { useState } from 'react';
import { ThemeProvider, DefaultTheme } from 'styled-components';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import './config/Reactotron';

import AppContext from './AppContext';
import Routes from './routes';

import history from './services/history';
import { store, persistor } from './store';

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
      <PersistGate persistor={persistor}>
        <Router history={history}>
          <AppContext.Provider value={{ toggleTheme }}>
            <ThemeProvider theme={theme}>
              <Routes />

              <GlobalStyles />
            </ThemeProvider>
          </AppContext.Provider>
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
