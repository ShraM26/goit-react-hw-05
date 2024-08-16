import MovieList from "../../components/MovieList/MovieList";
import  { useState } from 'react';
import { searchMovies } from '../../services/tmdb-api';

const MoviesPage = () => {
    const [query, setQuery] = useState('');
    const [movies, setMovies] = useState([]);

    const handleSearch = async () => {
        const data = await searchMovies(query);
        setMovies(data);
    };

    return (
        <div>
            <h1>Search Movies</h1>
            <input
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
            />
            <button onClick={handleSearch}>Search</button>
            <MovieList movies={movies} />
        </div>
    );
};

export default MoviesPage;