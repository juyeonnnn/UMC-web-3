import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 100px;
  color: white;
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

const CastContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  max-width: 800px;
  margin: 20px auto;
`;

const CastItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 20px;
  margin-bottom: 20px;
  width: 70px;
  font-size: 10px;
`;

const CastImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-bottom: 10px;
  object-fit: cover; //이미지 자르기
`;

const MovieDetailPage = () => {
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const { movieId } = useParams();

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const movieResponse = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}?api_key=8034545933d22b8920c3be8836dd6b76&language=ko-KR`
        );
        setMovie(movieResponse.data);

        const creditsResponse = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=8034545933d22b8920c3be8836dd6b76`
        );
        setCast(creditsResponse.data.cast);
      } catch (error) {
        console.error('Error fetching movie details: ', error);
      }
    };
    fetchMovie();
  }, [movieId]);

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <MovieDetailContainer>
        <MovieImage
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
              : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSz7ztleRwzXhFdiwBYqZ8cib9RvEsukVVUS3niN1YQ&s'
          }
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
      <h3>출연진 및 제작진</h3>
      <CastContainer>
        {cast.map((member) => (
          <CastItem key={member.id}>
            <CastImage
              src={
                member.profile_path
                  ? `https://image.tmdb.org/t/p/w200${member.profile_path}`
                  : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSz7ztleRwzXhFdiwBYqZ8cib9RvEsukVVUS3niN1YQ&s'
              }
              alt={member.name}
            />
            <span>{member.name}</span>
          </CastItem>
        ))}
      </CastContainer>
    </Container>
  );
};

export default MovieDetailPage;
