import { useState, useEffect } from 'react';
import { useParams, NavLink, Outlet, useLocation } from 'react-router-dom';
import { fetchMovieDetails } from '../../services/tmdb-api';
import css from './MovieDetailsPage.module.css'

const MovieDetailsPage = () => {
    const { movieId } = useParams();
    const [movie, setMovie] = useState(null);
    const location = useLocation();
    const backLinkHref = location.state?.from ?? '/movies'; // Переход на /movies, если состояние не задано

    useEffect(() => {
        const getMovieDetails = async () => {
            const data = await fetchMovieDetails(movieId);
            setMovie(data);
        };

        getMovieDetails();
    }, [movieId]);

    if (!movie) return <div>Loading...</div>;

    return (
        <div>
            <div  className={css.conteiner}>
                <NavLink className={css.goBack} to={backLinkHref}>Go back</NavLink>
                <div className={css.info}>
                     <h1>{movie.title}</h1>
                    <p>{movie.overview}</p>
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
                <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} />
            </div>
 
            <Outlet />
        </div>
    );
};

export default MovieDetailsPage;
