import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import debounce from 'lodash.debounce';

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
    margin-bottom: 50px;
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

const MovieList = styled.div`
  overflow-y: auto;
  max-height: 500px;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
  background-color: #19284b;
  margin: 0px 100px;
  border-radius: 20px;

  .movie-item {
    border-radius: 10px;
    width: 200px;
    height: 400px;
    background-color: #30335e;
    position: relative;
    margin-top: 50px;
  }

  .movie-item img {
    width: 100%;
    height: auto;
    border-radius: 10px 10px 0 0;
  }

  .movie-info {
    margin: 10px;
    font-weight: bold;
    color: white;
  }

  .moviename {
    font-size: 10px;
    float: left;
  }

  .movieaverage {
    font-size: 10px;
    float: right;
  }

  /* 스크롤바 */
  &::-webkit-scrollbar {
    width: 10px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: yellow; /* 스크롤바 색상을 노란색으로 변경 */
    border-radius: 10px;
  }
  &::-webkit-scrollbar-track {
    background-color: transparent; /* 스크롤바 트랙 배경색 */
  }
`;

const Loading = styled.div`
  margin-top: 100px;
  color: white;
`;

const MainPage = () => {
  const [keyword, setKeyword] = useState('');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  //로그인
  const [userName, setUserName] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loadingUser, setloadingUser] = useState(false);

  useEffect(() => {
    // 페이지가 로드될 때 로컬 스토리지에서 토큰을 확인하여 사용자 정보를 요청합니다.
    const token = localStorage.getItem('token');
    if (token) {
      fetchUserInfo(token);
    }
  }, []);

  const fetchUserInfo = (token) => {
    setloadingUser(true);
    fetch('http://localhost:8080/auth/me', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch user information');
        }
        return response.json();
      })
      .then((data) => {
        setUserName(data.name);
        setIsLoggedIn(true);
      })
      .catch((error) => {
        console.error('Error fetching user information:', error);
      })
      .finally(() => {
        setTimeout(() => {
          setloadingUser(false);
        }, 800); // 사용자 정보 요청이 완료되면 로딩 상태를 비활성화
      });
  };

  const handleChange = (event) => {
    const { value } = event.target;
    setKeyword(value);
    if (value.trim() === '') {
      setMovies([]);
    } else {
      searchMovies(value);
    }
  };

  const searchMovies = debounce((keyword) => {
    setLoading(true);
    const url = `https://api.themoviedb.org/3/search/movie?api_key=8034545933d22b8920c3be8836dd6b76&query=${keyword}&include_adult=false&language=ko-KR`;

    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
      },
    };

    fetch(url, options)
      .then((response) => response.json())
      .then((data) => {
        if (data.results && data.results.length > 0) {
          setMovies(data.results);
        } else {
          setMovies([]);
        }
        setTimeout(() => {
          setLoading(false);
        }, 500);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, 1500);

  return (
    <Main>
      {isLoggedIn ? (
        loadingUser ? (
          <Loading>로딩중...</Loading>
        ) : (
          <h2>{`${userName}님 환영합니다!`}</h2>
        )
      ) : (
        <h2>환영합니다!</h2>
      )}
      <h3>📽️ Find your movies !</h3>
      <div>
        <input type="text" value={keyword} onChange={handleChange} />
        <button>🔍</button>
      </div>
      {loading && <Loading>데이터를 받아오는 중입니다.</Loading>}
      {!loading && (
        <MovieList>
          {movies.map((movie) => (
            <Link
              to={`/movie/${movie.id}`}
              key={movie.id}
              className="movie-item"
            >
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
              />
              <div className="movie-info">
                <p className="moviename">{movie.title}</p>
                <p className="movieaverage">⭐{movie.vote_average}</p>
              </div>
            </Link>
          ))}
        </MovieList>
      )}
    </Main>
  );
};

export default MainPage;
