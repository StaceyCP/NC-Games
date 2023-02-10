import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import LogIn from './components/LogIn';
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
        path='/login'
        element={<LogIn/>}>
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
        <Route path='*' exact={true} element={<h2 className="error-msg">404 Sorry the requested url doesn't exist</h2>} />
      </Routes>
    </div>
  );
}

export default App;
