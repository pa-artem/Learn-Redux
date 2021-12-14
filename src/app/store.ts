import { configureStore } from '@reduxjs/toolkit';
import { Middleware } from 'redux';

import counterReducer from '@features/Counter/slice';

const logger: Middleware = ({ getState }) => (next) => (action) => {
  console.log('will dispatch action:', action);
  const returnValue = next(action);
  console.log('state after dispatch:', getState());
  return returnValue;
};

const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
