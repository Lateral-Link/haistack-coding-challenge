import styled from "styled-components";

export const StyledFooter = styled.footer`
  text-align: center;
  padding: 20px;
  background-color: #f8f8f8;

  p {
    margin-bottom: 10px;
  }

  div {
    display: flex;
    justify-content: center;
    align-items: center;

    a {
      margin: 0 10px;
      img {
        max-width: 24px; /* Defina o tamanho máximo desejado para as imagens */
      }
    }
  }
`;