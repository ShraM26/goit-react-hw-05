import  { useEffect, useState } from 'react';
import {fetchTrendingMovies} from '../../services/tmdb-api'
import MovieList from "../../components/MovieList/MovieList";
import css from './HomePage.module.css'

const HomePage = () => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const getTrendingMovies = async () => {
            const data = await fetchTrendingMovies();
            setMovies(data);
        };

        getTrendingMovies();
    }, []);

    return (
        <div className={css.HomePage}>
            <h1 className={css.title}>Trending Movies</h1>
            <MovieList movies={movies} />
        </div>
    );
};

export default HomePage;