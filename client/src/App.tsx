import React, { useState } from 'react';
import { ThemeProvider, DefaultTheme } from 'styled-components';

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
    <ThemeProvider theme={theme}>
      <h1>Hello, World!</h1>

      <button type="button" onClick={toggleTheme}>Trocar tema</button>

      <GlobalStyles />
    </ThemeProvider>
  );
}

export default App;
