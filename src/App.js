import { useEffect } from 'react';
import { getReviews } from './api';
import './App.css';

function App() {
  useEffect(() => {
    getReviews()
  }, []);
  
  return (
    <div className="App">
      <h1>NC-Games</h1>
    </div>
  );
}

export default App;
