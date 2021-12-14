import { useSelector, useDispatch } from 'react-redux';
import { useCallback } from 'react';

import { RootState, AppDispatch } from '@app/store';
import { decrement, changeByAmountAsync } from './slice';
import { Amount, Button, StyledCounter, Heading } from './styles';

function Counter() {
  const count = useSelector((state: RootState) => state.counter.value);
  const loading = useSelector((state: RootState) => state.counter.loading);
  const dispatch = useDispatch<AppDispatch>();

  const onDecrementClick = useCallback(() => {
    dispatch(decrement());
  }, [dispatch]);

  const onIncrementClick = useCallback(() => {
    dispatch(changeByAmountAsync())
      .unwrap()
      .then((result) => {
        console.log('from dispatch promise:', result);
      });
  }, [dispatch]);

  return (
    <StyledCounter>
      <Heading>{loading ? 'Loading...' : 'Counter'}</Heading>
      <Button text="-" type="button" aria-label="Decrement value" onClick={onDecrementClick} />
      <Amount>{count}</Amount>
      <Button text="+" type="button" aria-label="Increment value" onClick={onIncrementClick} />
    </StyledCounter>
  );
}

export default Counter;
