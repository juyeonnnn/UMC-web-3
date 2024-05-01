import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { AiOutlineLoading } from 'react-icons/ai';

const Popular = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
  justify-content: center;
  padding: 60px 200px;

  .movie-item {
    border-radius: 10px;
    width: 200px;
    height: 400px;
    background-color: #30335e;
    position: relative;
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
    font-size: 14px;
    margin-bottom: 5px;
  }

  .movieaverage {
    font-size: 12px;
  }
`;

const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 50px;
  color: #fff;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const PopularPage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/now_playing?api_key=8034545933d22b8920c3be8836dd6b76&language=en-US&page=1`
        );
        setMovies(response.data.results);
        setTimeout(() => {
          setLoading(false); // 최소 1초 후에 로딩 상태 변경
        }, 300); // 데이터가 로드된 후 로딩 상태 변경
      } catch (error) {
        console.error('Error fetching popular movies: ', error);
      }
    };
    fetchMovies();
  }, []);

  return (
    <>
      {loading ? (
        <LoadingSpinner>
          <AiOutlineLoading />
        </LoadingSpinner>
      ) : (
        <Popular>
          {movies.map((movie) => (
            <div key={movie.id} className="movie-item">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
              />
              <div className="movie-info">
                <p className="moviename">{movie.title}</p>
                <p className="movieaverage">⭐{movie.vote_average}</p>{' '}
              </div>
            </div>
          ))}
        </Popular>
      )}
    </>
  );
};

export default PopularPage;
