import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import ReviewPage from './components/ReviewPage';
import ReviewsHome from './components/ReviewsHome';

function App() {
  return (
    <div className="App">
      <Header/>
      <Routes>
        <Route 
          path='/' 
          element={<ReviewsHome/>}>
        </Route>
        <Route 
          path='/:category' 
          element={<ReviewsHome/>}>
        </Route>
        <Route 
          path='/reviews/:review_id'
          element={<ReviewPage/>}
        >
        </Route>
      </Routes>
    </div>
  );
}

export default App;
