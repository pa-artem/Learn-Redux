import { applyMiddleware, combineReducers, createStore, Middleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

// store uses the slice to create a reducer, a slice uses the type for global state
// (thunks give out the access to the global state)
// eslint-disable-next-line import/no-cycle
import * as Counter from '@features/Counter/slice';

const initialState = {
  counter: Counter.initialState,
};

export type StateType = typeof initialState;

export type Action = Counter.Action;

const logger: Middleware<unknown, StateType> = ({ getState }) => (next) => (action) => {
  console.log('will dispatch action:', action);
  const returnValue = next(action);
  console.log('state after dispatch:', getState());
  return returnValue;
};

const store = createStore(
  combineReducers<StateType, Action>({
    counter: Counter.reducer,
  }),
  initialState,
  composeWithDevTools(applyMiddleware(thunk), applyMiddleware(logger)),
);

export type DispatchType = typeof store.dispatch;

export type GlobalState = ReturnType<typeof store.getState>;

export default store;
