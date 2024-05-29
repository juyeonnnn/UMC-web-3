import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Nav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  background-color: #19284b;
  width: 100%;
  height: 50px;
  z-index: 5; /* 다른 요소보다 위에 위치하도록 설정 */

  ul {
    display: flex;
    list-style: none;
    padding: 0;
    justify-content: space-between;
    margin: 10px;
  }

  li {
    margin-right: 10px;
  }

  .home {
    margin-right: auto;
  }

  .active {
    color: white;
    text-decoration: none;
  }

  .active:hover {
    font-weight: bold;
  }

  .active:focus {
    font-weight: 500;
    color: yellow;
  }

  로그인&로그아웃 .login-button {
    margin-left: auto;
    margin-right: 10px;
  }

  .login-button button {
    background-color: transparent;
    color: yellow;
    border: none;
    cursor: pointer;
    font-size: 16px;
    font-weight: bold;
  }
`;

const Navbar = () => {
  //로그인 & 로그아웃
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // 페이지가 로드될 때 로컬 스토리지에서 토큰을 확인하여 로그인 상태를 설정합니다.
  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(token); // 토큰이 존재하면 isLoggedIn을 true로 설정합니다.
  }, []);

  // 로그아웃 시에는 로컬 스토리지에서 토큰을 삭제하고 isLoggedIn 상태를 false로 설정합니다.
  const handleLogoutClick = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    // 페이지를 새로고침합니다.
    window.location.reload();
  };

  return (
    <Nav>
      <ul>
        <li className="home">
          <Link to="/movie/popular" className="active">
            UMC Movie
          </Link>
        </li>
        <li className="login-button">
          {isLoggedIn ? (
            <button onClick={handleLogoutClick}>로그아웃</button>
          ) : (
            <>
              <Link to="/login" className="active" style={{ margin: '10px' }}>
                로그인
              </Link>
              <Link to="/signup" className="active">
                회원가입
              </Link>
            </>
          )}
        </li>
        <li>
          <Link to="/movie/popular" className="active">
            Popular
          </Link>
        </li>
        <li>
          <Link to="/movie/now-playing" className="active">
            Now Playing
          </Link>
        </li>
        <li>
          <Link to="/movie/top-rated" className="active">
            Top Rated
          </Link>
        </li>
        <li>
          <Link to="/movie/upcoming" className="active">
            Upcoming
          </Link>
        </li>
      </ul>
    </Nav>
  );
};

export default Navbar;
