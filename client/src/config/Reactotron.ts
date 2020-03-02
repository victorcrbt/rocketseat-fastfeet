import Reactotron from 'reactotron-react-js';
import { reactotronRedux } from 'reactotron-redux';
import reactotronSaga from 'reactotron-redux-saga';

type ReactotronType = typeof Reactotron;

declare global {
  interface Console {
    tron: ReactotronType;
  }
}

if (process.env.NODE_ENV === 'development') {
  const tron = Reactotron.configure()
    .use(reactotronRedux())
    .use(reactotronSaga({}))
    .connect();

  if (tron.clear) {
    tron.clear();
  }

  console.tron = tron;
}
