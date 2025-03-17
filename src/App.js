import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
import GlobalStyle from './styles/GlobalStyle';
import theme from './styles/theme';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import RoadmapGenerator from './pages/RoadmapGenerator';
import Roadmap from './pages/Roadmap';

const AppContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  min-height: calc(100vh - 160px); /* Account for navbar and footer */
`;

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Router>
        <Navbar />
        <AppContainer>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/generator" element={<RoadmapGenerator />} />
            <Route path="/roadmap" element={<Roadmap />} />
          </Routes>
        </AppContainer>
        <Footer />
      </Router>
    </ThemeProvider>
  );
}

export default App;