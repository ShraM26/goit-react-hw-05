import { Link, useLocation } from 'react-router-dom';
import Slider from 'react-slick';


import css from './MovieList.module.css'; 

const MovieList = ({ movies }) => {
    const location = useLocation();

    // Настройки слайдера
    const settings = {
        dots: true,
        infinite: true,
        arrows:false,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 3,
    };

    return (
        <div className={css.movieList}>
            <Slider {...settings}>
                {movies.map(movie => (
                    <div key={movie.id} className={css.movieItem}>
                        <Link
                            to={`/movies/${movie.id}`}
                            state={{ from: location.pathname }} // Сохраняем путь, с которого пришли
                        >
                            <img
                                src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`}
                                alt={movie.title}
                                className={css.movieImage}
                            />
                            <h3 className={css.movieTitle}>{movie.title}</h3>
                        </Link>
                    </div>
                ))}
          
            </Slider>
        </div>
    );
};

export default MovieList;