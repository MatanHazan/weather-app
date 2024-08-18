import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
import Welcome from './components/Welcome';
import Search from './components/Search';
import Weather from './components/Weather';

export function useButtonStyles() {
  const styles = {
    backgroundColor: 'black',
    border: 'none',
    borderRadius: '16px',
    color: 'white',
    display: 'block',
    fontSize: '16px',
    fontWeight: 'bold',
    margin: 'auto',
    padding: '8px 24px'
  };

  return styles
};

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/search" element={<Search />} />
          <Route path="/weather" element={<Weather />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
};

export default App;