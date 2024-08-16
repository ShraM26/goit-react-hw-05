import { useState, useEffect } from 'react';
import { fetchMovieCredits } from '../../services/tmdb-api';
import { useParams } from 'react-router-dom';
import css from './MovieCast.module.css'


const DEFAULT_IMAGE_URL = 'https://via.placeholder.com/200x300?text=No+Image';

const MovieCast = () => {
    const { movieId } = useParams();
    const [cast, setCast] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getCast = async () => {
            try {
                if (movieId) {
                    const data = await fetchMovieCredits(movieId);
                    setCast(data || []);
                } else {
                    setError('No movie ID provided');
                }
            } catch (error) {
                setError(error.message);
            }
        };

        getCast();
    }, [movieId]);

    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            {cast.length > 0 ? (
                <ul className={css.castList}>
                    {cast.map((actor) => (
                        <li key={actor.id} className={css.castItem}>
                            <img
                                src={actor.profile_path
                                    ? `https://image.tmdb.org/t/p/w200/${actor.profile_path}`
                                    : DEFAULT_IMAGE_URL}
                                alt={actor.name}
                                className={css.actorImage}
                            />
                            <div className={css.actorInfo}>
                                <p>{actor.name}</p>
                                <p>Character: {actor.character}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No cast information available</p>
            )}
        </div>
    );
};

export default MovieCast;