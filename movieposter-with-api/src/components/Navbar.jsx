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
`;

const Navbar = () => {
  return (
    <Nav>
      <ul>
        <li className="home">
          <Link to="popular" className="active">
            UMC Movie
          </Link>
        </li>
        <li>
          <Link to="/popular" className="active">
            Popular
          </Link>
        </li>
        <li>
          <Link to="/now-playing" className="active">
            Now Playing
          </Link>
        </li>
        <li>
          <Link to="/top-rated" className="active">
            Top Rated
          </Link>
        </li>
        <li>
          <Link to="/upcoming" className="active">
            Upcoming
          </Link>
        </li>
      </ul>
    </Nav>
  );
};

export default Navbar;
