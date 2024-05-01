import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const Popular = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
  justify-content: center; /* 가운데 정렬 */
  padding: 60px 200px;

  .movie-item {
    border-radius: 10px;
    width: 200px;
    height: 400px;
    background-color: #30335e;
    position: relative;
  }

  .movie-item img {
    width: 100%; /* 포스터 이미지의 너비를 조정하여 부모 요소에 맞게 설정합니다. */
    height: auto; /* 높이는 자동으로 조정됩니다. */
  }

  /*제목과 평점*/
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
`;

const PopularPage = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/popular?api_key=8034545933d22b8920c3be8836dd6b76&language=en-US&page=1`
        );
        setMovies(response.data.results);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching popular movies: ', error);
      }
    };
    fetchMovies();
  }, []);

  return (
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
  );
};

export default PopularPage;
