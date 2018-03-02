// file: src/store.js
import { compose, createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import { persistStore} from 'redux-persist';
import rootReducer from './reducers';

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(
      createLogger(),
    ),
    // autoRehydrate()
  )
);
persistStore(store);
export default store;