import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import  { Suspense, lazy } from 'react';
import Navigation from './components/Navigation/Navigation';

const HomePage = lazy(() => import('./pages/HomePage/HomePage'));
const MoviesPage = lazy(() => import('./pages/MoviesPage/MoviesPage'));
const MovieDetailsPage = lazy(() => import('./pages/MovieDetailsPage/MovieDetailsPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage/NotFoundPage'));
const MovieCast = lazy(() => import('./components/MovieCast/MovieCast'));
const MovieReviews = lazy(() => import('./components/MovieReviews/MovieReviews'));
// библиотека для карусели 
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const App = () => {
      return (
        <Router>
            <Navigation />
            <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/movies" element={<MoviesPage />} />
                    <Route path="/movies/:movieId" element={<MovieDetailsPage />}>
                         <Route path="cast" element={<MovieCast />} />
                         <Route path="reviews" element={<MovieReviews />} />
                  </Route>
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            </Suspense>
        </Router>
    );

};

export default App
