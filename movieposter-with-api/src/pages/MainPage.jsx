import React from 'react';
import styled from 'styled-components';

const Main = styled.div`
  h2 {
    background-color: black;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 330px;
    margin-bottom: 100px;
  }
  div {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 100px;
  }
  input {
    height: 50px;
    width: 300px;
    border-radius: 40px;
  }
  h3 {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 100px;
    font-size: 30px;
    color: white;
  }
  button {
    font-size: 15px;
    height: 40px;
    width: 40px;
    margin-left: 20px;
    border-radius: 100px;
    background-color: yellow;
  }
`;
const MainPage = () => {
  return (
    <Main>
      <h2>환영합니다</h2>
      <h3>📽️ Find your movies !</h3>
      <div>
        <input type="text" />
        <button>🔍</button>
      </div>
    </Main>
  );
};

export default MainPage;
