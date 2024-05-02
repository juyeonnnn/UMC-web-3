import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import MainPage from './pages/MainPage';
import MovieDetailPage from './pages/MovieDetailPage';
import PopularPage from './pages/PopularPage';
import NowPlayingPage from './pages/NowPlayingPage';
import TopRatedPage from './pages/TopRatedPage';
import UpComingPage from './pages/UpComingPage';
import NotFound from './pages/NotFound';
import styled from 'styled-components';

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Content = styled.div`
  flex: 1;
  background-color: #22254b;
`;

function App() {
  return (
    <Router>
      <AppContainer>
        <Navbar />
        <Content>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/movie/popular" element={<PopularPage />} />
            <Route path="/movie/now-playing" element={<NowPlayingPage />} />
            <Route path="/movie/top-rated" element={<TopRatedPage />} />
            <Route path="/movie/upcoming" element={<UpComingPage />} />
            <Route path="/movie/:movieName" element={<MovieDetailPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Content>
        <Footer />
      </AppContainer>
    </Router>
  );
}

export default App;
