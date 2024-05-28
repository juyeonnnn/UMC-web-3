import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const NowPlaying = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr); /* 네 개의 열로 설정 */
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

const LoadingSpinner = styled.div`
  margin-top: 20px;
  text-align: center;
`;

const NowPlayingPage = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const observer = useRef();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/now_playing?api_key=8034545933d22b8920c3be8836dd6b76&language=en-US&page=${page}`
        );
        setMovies((prevMovies) => [...prevMovies, ...response.data.results]);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching now playing movies: ', error);
        setLoading(false);
      }
    };
    fetchMovies();
  }, [page]);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '20px',
      threshold: 0.1,
    };
    observer.current = new IntersectionObserver(handleIntersection, options);
    if (observer.current) {
      observer.current.observe(document.getElementById('observer'));
    }
    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, []);

  const handleIntersection = (entries) => {
    const target = entries[0];
    if (target.isIntersecting) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <>
      <NowPlaying>
        {movies.map((movie) => (
          <Link to={`/movie/${movie.id}`} key={movie.id} className="movie-item">
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
        <div id="observer"></div>
      </NowPlaying>
      {loading && (
        <LoadingSpinner>
          <p>Loading...</p>
        </LoadingSpinner>
      )}
    </>
  );
};

export default NowPlayingPage;
