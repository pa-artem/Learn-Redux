import styled from 'styled-components';
import { darken } from 'polished';

import fontSize from '@global-styles/font-sizes';
import margin from '@global-styles/margins';

import NumberInput from '@ui-components/NumberInput';
import themeVariables from '@global-styles/themes';

export const StyledCounter = styled.div`
  display: grid;
  grid-template:
    "heading   heading   heading  "
    "decrement amount    increment" min-content / min-content minmax(min-content, 5rem) min-content;
  place-items: center;
  justify-content: center;
  gap: ${margin[500]} ${margin[400]};
  margin: 0 auto;
  padding: calc(2 * ${margin[400]}) ${margin[400]};
  border-radius: 0.5rem;
  background-color: #f0eff4;
  color: #6b61ff;

  @media (max-width: 25rem) {
    display: flex;
    flex-direction: column;
  }
`;

export const Amount = styled.div`
  grid-area: amount;
  font-size: ${fontSize[500]};
`;

export const Heading = styled.h2`
  grid-area: heading;
  font-size: ${fontSize[700]};
`;

interface ButtonProps {
  text?: string;
}

export const Button = styled.button<ButtonProps>`
  grid-area: ${({ text }) => text == '+' ? 'increment' : 'decrement'};
  position: relative;
  width: 1em;
  height: 1em;
  max-width: 100%;
  max-height: 100%;
  border: none;
  border-radius: 0.25em;
  cursor: pointer;
  background-color: ${themeVariables.primary[400].variable};
  font-size: ${fontSize[700]};
  color: #f0eff4;
  filter: drop-shadow(0 0.15em 0 #8ecde6);
  transition: transform 50ms, filter 50ms;

  &::before {
    content: '${({ text }) => text ?? ''}';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  &:active {
    transform: translateY(0.1em);
    filter: drop-shadow(0 0em 0 #8ecde6);
    background-color: ${darken(0.1, '#6b61ff')};
  }
`;

export const ChangeByAmount = styled(NumberInput)`
  grid-area: change-by;
  width: 100%;
  height: 100%;
  font-size: ${fontSize[500]};
`;
