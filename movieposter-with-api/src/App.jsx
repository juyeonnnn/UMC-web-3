import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import MainPage from './pages/MainPage';
import PopularPage from './pages/PopularPage';
import NowPlayingPage from './pages/NowPlayingPage';
import TopRatedPage from './pages/TopRatedPage';
import UpComingPage from './pages/UpComingPage';
import styled from 'styled-components';
import movieService from './services/movieService';

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
            <Route
              path="/popular"
              element={<PopularPage />} // Popular 페이지 추가
            />
            <Route
              path="/now-playing"
              element={<NowPlayingPage movieService={movieService} />}
            />
            <Route
              path="/top-rated"
              element={<TopRatedPage movieService={movieService} />}
            />
            <Route
              path="/upcoming"
              element={<UpComingPage movieService={movieService} />}
            />
          </Routes>
        </Content>
        <Footer />
      </AppContainer>
    </Router>
  );
}

export default App;
