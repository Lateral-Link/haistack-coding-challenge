import { createGlobalStyle } from 'styled-components';

const GlobalFont = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');
  
  body {
    font-family: 'Roboto', sans-serif;
  }
`;

export default GlobalFont;
