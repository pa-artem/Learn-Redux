import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  *,
  *::after,
  *::before {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    background-color: #66a1ff;
    color: #f0eff4;
  }

  body,
  button {
    font-family: "Fira Sans";
  }

  h1,
  h2,
  h3 {
    font-family: "Yanone Kaffeesatz";
    font-weight: 400;
  }
`;
