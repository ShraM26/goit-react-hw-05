import { useState, useEffect } from 'react';
import { useParams, NavLink, Outlet, useLocation } from 'react-router-dom';
import { fetchMovieDetails } from '../../services/tmdb-api';
import css from './MovieDetailsPage.module.css'

const MovieDetailsPage = () => {
    const { movieId } = useParams();
    const [movie, setMovie] = useState(null);
    const location = useLocation();
    const backLinkHref = location.state?.from ?? '/movies';

    useEffect(() => {
        const getMovieDetails = async () => {
            const data = await fetchMovieDetails(movieId);
            setMovie(data);
        };

        getMovieDetails();
    }, [movieId]);

    if (!movie) return <div className={css.loading}>Loading...</div>;

    const genres = movie.genres.map(genre => genre.name).join(', ');
    const releaseDate = new Date(movie.release_date).toLocaleDateString();
    const runtime = `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m`;

    return (
        <div>
            <div className={css.container}>
                <NavLink className={css.goBack} to={backLinkHref}>Go back</NavLink>
                <img className={css.img} src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} />
                <div className={css.info}>
                    <h1>{movie.title}</h1>
                    <p>{movie.overview}</p>
                    <ul>
                        <li><strong>Genres:</strong> {genres}</li>
                        <li><strong>Release Date:</strong> {releaseDate}</li>
                        <li><strong>Runtime:</strong> {runtime}</li>
                        <li><strong>Rating:</strong> {movie.vote_average} / 10</li>
                    </ul>
                    <nav className={css.nav}>
                        <NavLink
                            to="cast"
                            className={({ isActive }) => 
                            isActive ? `${css.navLink} ${css.activeLink}` : css.navLink
                            }
                        >
                            Cast
                        </NavLink>
                        <NavLink
                            to="reviews"
                            className={({ isActive }) => 
                            isActive ? `${css.navLink} ${css.activeLink}` : css.navLink
                            }
                        >
                            Reviews
                        </NavLink>
                    </nav>
                </div>
            </div>
            <Outlet />
        </div>
    );
};

export default MovieDetailsPage;