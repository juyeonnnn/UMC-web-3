import React from 'react';
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
    font-size: 16px;
  }

  .active:focus {
    font-weight: 500;
    color: yellow;
  }

  //로그인&로그아웃
  // .login-button {
  //   margin-left: auto;
  //   margin-right: 10px;
  // }

  // .login-button button {
  //   background-color: transparent;
  //   color: white;
  //   border: none;
  //   cursor: pointer;
  //   color: yellow;
  //   font-weight: 600;
  // }

  // .login-button button:hover {
  //   font-weight: bold;
  // }
`;

const Navbar = () => {
  //로그인&로그아웃
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const handleLoginClick = () => {
  //   setIsLoggedIn(true);
  // };

  // const handleLogoutClick = () => {
  //   setIsLoggedIn(false);
  // };

  return (
    <Nav>
      <ul>
        <li className="home">
          <Link to="/movie/popular" className="active">
            UMC Movie
          </Link>
        </li>
        <li className="login-button">
          {/* {isLoggedIn ? (
            <button onClick={handleLogoutClick}>로그아웃</button>
          ) : (
            <button onClick={handleLoginClick}>로그인</button>
          )} */}
          <Link to="/login" className="active" style={{ margin: '10px' }}>
            로그인
          </Link>
          <Link to="/signup" className="active">
            회원가입
          </Link>
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
