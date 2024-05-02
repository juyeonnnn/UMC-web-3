import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 100px;
  color: white;
  margin: 0px 100px;
`;

const MovieDetailContainer = styled.div`
  display: flex;
  max-width: 800px;
  margin-top: 30px;
`;

const MovieImage = styled.img`
  width: 200px;
  height: auto;
  margin-right: 30px;
`;

const MovieInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.h2`
  margin-bottom: 10px;
`;

const Overview = styled.p`
  margin-bottom: 20px;
`;

const Rating = styled.div`
  margin-bottom: 20px;
`;

const StarRating = ({ rating }) => {
  const stars = [];

  for (let i = 0; i < Math.floor(rating); i++) {
    stars.push(<span key={i}>⭐️</span>);
  }

  return <>평점 : {stars}</>;
};

const MovieDetailPage = () => {
  const [movie, setMovie] = useState(null);
  const { movieName } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/search/movie?api_key=8034545933d22b8920c3be8836dd6b76&language=en-US&query=${movieName}`
        );
        setMovie(response.data.results[0]);
      } catch (error) {
        console.error('Error fetching movie details: ', error);
      }
    };
    fetchMovie();
  }, [movieName]);

  return (
    <Container>
      <MovieDetailContainer>
        <MovieImage
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
        />
        <MovieInfo>
          <Title>{movie.title}</Title>
          <Rating>
            <StarRating rating={movie.vote_average} />
          </Rating>
          <h3>개봉일: {movie.release_date}</h3>
          <h3>줄거리</h3>
          <Overview>
            {movie.overview ? movie.overview : '줄거리가 없습니다.'}
          </Overview>
        </MovieInfo>
      </MovieDetailContainer>
    </Container>
  );
};

export default MovieDetailPage;
