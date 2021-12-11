import { ActionCreatorWithoutPayload, Dispatch } from '@reduxjs/toolkit';
import { useCallback } from 'react';

function useAction<T extends ActionCreatorWithoutPayload>(dispatch: Dispatch, actionCreator: T) {
  return useCallback(() => dispatch(actionCreator()), [dispatch, actionCreator]);
}

export default useAction;
