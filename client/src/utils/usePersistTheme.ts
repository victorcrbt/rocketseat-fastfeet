import {
  useState, useEffect, Dispatch, SetStateAction,
} from 'react';

type Response<T> = [
  T,
  Dispatch<SetStateAction<T>>
];

function usePersistTheme<T>(initialState: T): Response<T> {
  const [state, setState] = useState(() => {
    const storageValue = localStorage.getItem('fastfeet:theme');

    if (storageValue) {
      return JSON.parse(storageValue);
    }

    return initialState;
  });

  useEffect(() => {
    localStorage.setItem('fastfeet:theme', JSON.stringify(state));
  }, [state]);

  return [state, setState];
}

export default usePersistTheme;
