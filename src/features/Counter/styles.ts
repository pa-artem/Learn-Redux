import styled from 'styled-components';
import { darken } from 'polished';

export const StyledCounter = styled.div`
  display: grid;
  grid-template:
    "heading   heading   heading  "
    "decrement amount    increment" 2.5rem / 2.5rem minmax(3rem, max-content) 2.5rem;
  place-items: center;
  justify-content: center;
  gap: 0.5rem 2rem;
  margin: 0 auto;
  padding: 2rem 1rem;
  border-radius: 0.5rem;
  background-color: #f0eff4;
  color: #6b61ff;
  font-size: 2rem;

  @media (max-width: 25rem) {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }
`;

export const Amount = styled.div`
  grid-area: amount;
`;

export const Heading = styled.h2`
  grid-area: heading;
  font-size: 2.5rem;
`;

interface ButtonProps {
  text?: string;
}

export const Button = styled.button<ButtonProps>`
  grid-area: ${({ text }) => text == '+' ? 'increment' : 'decrement'};
  position: relative;
  width: 100%;
  height: 100%;
  border: none;
  border-radius: 0.25em;
  cursor: pointer;
  background-color: #6b61ff;
  font-size: 3rem;
  color: #f0eff4;
  filter: drop-shadow(0 0.1em 0 #8ecde6);
  transition: transform 50ms, filter 50ms;

  @media(max-width: 25rem) {
    width: 3rem;
    height: 3rem;
  }

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
