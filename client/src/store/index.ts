import createSagaMiddleware, { SagaMonitor } from 'redux-saga';
import { AuthState } from './modules/auth/types';

import createStore from './createStore';
import rootReducer from './modules/rootReducer';
import rootSaga from './modules/rootSaga';

export interface ApplicationState {
  auth: AuthState;
}

const sagaMonitor: SagaMonitor = (process.env.NODE_ENV === 'development'
  ? console.tron.createSagaMonitor!()
  : null) as SagaMonitor;

const sagaMiddleare = createSagaMiddleware({ sagaMonitor });

const middlewares = [sagaMiddleare];

const store = createStore<ApplicationState>(rootReducer, middlewares);

sagaMiddleare.run(rootSaga);

export default store;
