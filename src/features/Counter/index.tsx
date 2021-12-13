import { useSelector, useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { useCallback } from 'react';

import { StateType, Action } from '@app/store';
import { Amount, Button, StyledCounter, Heading } from './styles';
import { changeByAmountAsync } from './slice';

function Counter() {
  const count = useSelector<StateType, number>((state) => state.counter.value);
  const dispatch: ThunkDispatch<StateType, unknown, Action> = useDispatch();

  const onDecrementClick = useCallback(
    () =>
      changeByAmountAsync(dispatch)({ amount: -5, delay: 750 }).then((result) =>
        console.log('Result from promise returned from dispatch', result),
      ),
    [dispatch],
  );
  const onIncrementClick = useCallback(
    () =>
      changeByAmountAsync(dispatch)({ amount: 5, delay: 750 }).then((result) =>
        console.log('Result from promise returned from dispatch', result),
      ),
    [dispatch],
  );

  return (
    <StyledCounter>
      <Heading>Counter</Heading>
      <Button text="-" type="button" aria-label="Decrement value" onClick={onDecrementClick} />
      <Amount>{count}</Amount>
      <Button text="+" type="button" aria-label="Increment value" onClick={onIncrementClick} />
    </StyledCounter>
  );
}

export default Counter;
