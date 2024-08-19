import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import MovieList from "../../components/MovieList/MovieList";
import { searchMovies, getRandomMovies } from '../../services/tmdb-api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import css from './MoviesPage.module.css';

const MoviesPage = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const query = searchParams.get('query') || '';
    const [movies, setMovies] = useState([]);
    const [searchQuery, setSearchQuery] = useState(query); // Локальний стан для інпуту

    useEffect(() => {
        if (query) {
            const fetchMovies = async () => {
                const data = await searchMovies(query);
                setMovies(data);
            };
            fetchMovies();
        } else {
            const fetchRandomMovies = async () => {
                const randomMovies = await getRandomMovies();
                setMovies(randomMovies);
            };
            fetchRandomMovies();
        }
    }, [query]);

    const handleSearch = () => {
        setSearchParams({ query: searchQuery }); 
        setSearchQuery('');
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
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)} 
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