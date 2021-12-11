import { breakpoints } from '@global-styles/breakpoints';
import fontSize from '@global-styles/font-sizes';

import styled from 'styled-components';

export const Heading = styled.h1`
  font-size: ${fontSize[900]};
  text-align: center;
  margin-bottom: 1em;
`;

export const Container = styled.div`
  max-width: calc(${breakpoints.medium.value} / 1.5);
  margin: 0 auto;
  padding: 4rem 2rem;
`;
