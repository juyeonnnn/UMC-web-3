import React from 'react';
import styled from 'styled-components';

const Foot = styled.footer`
  bottom: 0;
  left: 0;
  width: 100%;
  height: 50px;
  background-color: #19284b;
  color: white;
  text-align: center;
  padding: 10px 0;
`;

const Footer = () => {
  return (
    <Foot>
      <p>Juyeon/Joy-UMC-Movieposter-with-API</p>
    </Foot>
  );
};

export default Footer;
