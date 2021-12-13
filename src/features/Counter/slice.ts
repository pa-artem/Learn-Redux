import { produce } from 'immer';
import { ThunkDispatch } from 'redux-thunk';

import timeout from '@util/timeout';

// store uses the slice to create a reducer, a slice uses the type for global state
// (thunks give out the access to the global state)
// eslint-disable-next-line import/no-cycle
import { GlobalState } from '@app/store';

// actions

export type ActionType = 'counter/increment' | 'counter/decrement' | 'counter/change-by-amount';

export type Action = {
  type: ActionType;
  payload?: number;
};

// state

export type State = {
  value: number;
};

export const initialState: State = {
  value: 0,
};

export function reducer(state: State | undefined, { type, payload }: Action) {
  if (state == undefined) {
    return initialState;
  }

  return produce(state, (draft) => {
    switch (type) {
      case 'counter/increment':
        draft.value += 1;
        break;
      case 'counter/decrement':
        draft.value -= 1;
        break;
      case 'counter/change-by-amount':
        draft.value += payload ?? 0;
        break;
      default:
        break;
    }
  });
}

// action creators

export function increment(): Action {
  return { type: 'counter/increment' };
}

export function decrement(): Action {
  return { type: 'counter/decrement' };
}

export function changeByAmount(amount: number): Action {
  return { type: 'counter/change-by-amount', payload: amount };
}

type ChangeByAmountParams = {
  amount?: number;
  delay?: number;
};

export const changeByAmountAsync =
  (dispatch: ThunkDispatch<GlobalState, unknown, Action>) =>
    ({ amount = 0, delay = 0 }: ChangeByAmountParams = {}) =>
      dispatch(async (dispatch, getState) => {
        await timeout(delay);
        dispatch({ type: 'counter/change-by-amount', payload: amount });
        return getState().counter.value;
      });
