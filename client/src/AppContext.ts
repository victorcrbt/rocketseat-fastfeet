import { createContext } from 'react';

export interface AppContextInterface {
  toggleTheme(): void;
}

const AppContext = createContext<AppContextInterface>(
  {} as AppContextInterface
);

export default AppContext;
