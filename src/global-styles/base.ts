import { createGlobalStyle } from 'styled-components';

import { fontSizesValues } from './font-sizes';
import { customPropertiesBetween } from './breakpoints';
import defaultTheme, { themeVariablesCSS } from './themes';
import fonts from './fonts';

export default createGlobalStyle`
  *,
  *::after,
  *::before {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  ${customPropertiesBetween('font-size', fontSizesValues)}

  :root {
    ${themeVariablesCSS}
  }

  body {
    background-color: ${defaultTheme.primary[300].variable};
    color: ${defaultTheme.neutral[100].variable};
  }

  body,
  button {
    font-family: ${fonts.regular};
  }

  h1,
  h2,
  h3 {
    font-family: ${fonts.heading};
    font-weight: 400;
  }
`;
