import React from "react";
import { StyledFooter } from "../styles/Common/Footer";

const Footer = () => {
  return (
    <StyledFooter>
      <p>Created by Guilherme Andreúce</p>
      <div>
        <a href="https://www.github.com/streeg" target="_blank" rel="noopener noreferrer">
          <img src="/git.png" alt="GitHub" />
        </a>
        <a href="https://www.linkedin.com/in/guilherme-andreuce-monteiro/" target="_blank" rel="noopener noreferrer">
          <img src="/linkedin.png" alt="LinkedIn" />
        </a>
      </div>
    </StyledFooter>
  );
};

export default Footer;
