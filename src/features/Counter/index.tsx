import { useSelector, useDispatch } from 'react-redux';

import { RootState } from '@app/store';
import useAction from '@hooks/useAction';
import { increment, decrement } from './slice';
import { Amount, Button, StyledCounter, Heading, ChangeByAmount } from './styles';

function Counter() {
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();

  const onDecrementClick = useAction(dispatch, decrement);
  const onIncrementClick = useAction(dispatch, increment);

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
