import createSagaMiddleware, { SagaMonitor } from 'redux-saga';
import { persistStore } from 'redux-persist';

import { AuthState } from './modules/auth/types';
import { UserState } from './modules/user/types';

import persistReducer from './persistReducer';
import createStore from './createStore';
import rootReducer from './modules/rootReducer';
import rootSaga from './modules/rootSaga';

export interface ApplicationState {
  auth: AuthState;
  user: UserState;
}

const sagaMonitor: SagaMonitor = (process.env.NODE_ENV === 'development'
  ? console.tron.createSagaMonitor!()
  : null) as SagaMonitor;

const sagaMiddleare = createSagaMiddleware({ sagaMonitor });

const middlewares = [sagaMiddleare];

const store = createStore<ApplicationState>(
  persistReducer(rootReducer),
  middlewares
);
const persistor = persistStore(store);

sagaMiddleare.run(rootSaga);

export { store, persistor };
