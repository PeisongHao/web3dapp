import { createStore, applyMiddleware } from 'redux';
import {thunk} from 'redux-thunk';
import rootReducer from './reducers/rootReducer';
import { persistStore, persistReducer } from 'redux-persist';
import storageSession from 'redux-persist/lib/storage/session';

const persistConfig = {
    key: 'root', // 必须的，redux-persist 的 key 前缀
    storage: storageSession, // 使用 sessionStorage
    // whitelist: ['someReducer'], 如果你只想持久化某些特定的 reducers，可以使用 whitelist
  };
  
  const persistedReducer = persistReducer(persistConfig, rootReducer);

  let store = createStore(persistedReducer, applyMiddleware(thunk));
  let persistor = persistStore(store);
  
  export { store, persistor };
