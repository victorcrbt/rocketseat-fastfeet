import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import { Reducer } from 'redux';

export default <T>(reducers: Reducer<T, { type: any; payload: any }>) => {
  return persistReducer(
    {
      key: 'fastfeet',
      storage,
      whitelist: ['auth', 'user'],
    },
    reducers
  );
};
