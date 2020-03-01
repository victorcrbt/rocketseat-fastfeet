import { useState, useEffect, Dispatch, SetStateAction } from 'react';

type Response<T> = [T, Dispatch<SetStateAction<T>>];

function usePersistTheme<T>(initialState: T): Response<T> {
  const [state, setState] = useState(() => {
    const storageValue = localStorage.getItem('theme:fastfeet');

    if (storageValue) {
      return JSON.parse(storageValue);
    }

    return initialState;
  });

  useEffect(() => {
    localStorage.setItem('theme:fastfeet', JSON.stringify(state));
  }, [state]);

  return [state, setState];
}

export default usePersistTheme;
