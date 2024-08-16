import { useState, useEffect } from 'react';
import { fetchMovieReviews } from '../../services/tmdb-api';
import { useParams, useLocation, Link } from 'react-router-dom';
import css from './MovieReviews.module.css';

const MovieReviews = () => {
    const { movieId } = useParams();
    const [reviews, setReviews] = useState([]);
    const [error, setError] = useState(null);
    const location = useLocation();
    const backLinkHref = location.state?.from ?? '/movies'; // Переход на /movies, если состояние не задано

    useEffect(() => {
        const getReviews = async () => {
            try {
                if (movieId) {
                    const data = await fetchMovieReviews(movieId);
                    setReviews(data);
                } else {
                    setError('No movie ID provided');
                }
            } catch (error) {
                setError(error.message);
            }
        };

        getReviews();
    }, [movieId]);

    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <Link to={backLinkHref}>Go back</Link>
            <h2>Reviews</h2>
            {reviews.length > 0 ? (
                <ul className={css.reviewsList}>
                    {reviews.map((review) => (
                        <li key={review.id} className={css.reviewItem}>
                            <h3>{review.author}</h3>
                            <p>{review.content}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No reviews available</p>
            )}
        </div>
    );
};

export default MovieReviews;