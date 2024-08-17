import MovieList from "../../components/MovieList/MovieList";
import  { useState, useEffect } from 'react';
import { searchMovies, getRandomMovies } from '../../services/tmdb-api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import css from './MoviesPage.module.css';

const MoviesPage = () => {
    const [query, setQuery] = useState('');
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        // Функция для получения случайных фильмов при загрузке страницы
        const fetchRandomMovies = async () => {
            const randomMovies = await getRandomMovies(); // Получаем случайные фильмы
            setMovies(randomMovies);
        };

        fetchRandomMovies();
    }, []); // Пустой массив зависимостей, чтобы эффект выполнился только один раз при монтировании

    const handleSearch = async () => {
        const data = await searchMovies(query);
        setMovies(data);
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <>
            <div className={css.MoviesPage}>
                <h1>Search Movies</h1>
                <div className={css.searchContainer}>
                    <input
                        type="text"
                        value={query}
                        onChange={e => setQuery(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Search movies..."
                    />
                    <button className={css.searchButton} onClick={handleSearch}>
                        <FontAwesomeIcon icon={faSearch} className={css.searchIcon} />
                    </button>
                </div>
            </div>
            <MovieList movies={movies} />
        </>
    );
};

export default MoviesPage;