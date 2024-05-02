import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const NowPlaying = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
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
    font-size: 10px;
    float: left;
  }

  .movieaverage {
    font-size: 10px;
    float: right;
  }
`;

const NowPlayingPage = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/now_playing?api_key=8034545933d22b8920c3be8836dd6b76&language=en-US&page=1`
        );
        setMovies(response.data.results);
      } catch (error) {
        console.error('Error fetching now playing movies: ', error);
      }
    };
    fetchMovies();
  }, []);

  return (
    <NowPlaying>
      {movies.map((movie) => (
        <Link
          to={`/movie/${movie.title}`}
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
    </NowPlaying>
  );
};

export default NowPlayingPage;
