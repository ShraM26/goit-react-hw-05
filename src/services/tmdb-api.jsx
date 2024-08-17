import axios from 'axios';

const ACCESS_TOKEN = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxOGQ2NjY2NDE1NDc2MzZkMDE5NDkxOWY0NjM3YWY3ZiIsIm5iZiI6MTcyMzgyMjQwMi4wMzM1MDksInN1YiI6IjY2YmY2ZWE0ZjQxNWU2MjY2YzlhZTAzNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.cjHRd54r7Y83UU-492XexKYFGImiTPFXrpIL_Alodgc';

const tmdbApi = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    headers: {
        Authorization: ACCESS_TOKEN,
    },
});

export const fetchTrendingMovies = async () => {
    const response = await tmdbApi.get('/trending/movie/day');
    return response.data.results;
};

export const searchMovies = async (query) => {
    const response = await tmdbApi.get(`/search/movie?query=${query}`);
    return response.data.results;
};
// Функция для получения случайных фильмов
export const getRandomMovies = async () => {
    const randomPage = Math.floor(Math.random() * 500) + 1; // Генерируем случайную страницу (от 1 до 500)
    const response = await tmdbApi.get('/discover/movie', {
        params: {
            page: randomPage,
        },
    });
    return response.data.results;
};
export const fetchMovieDetails = async (movieId) => {
    const response = await tmdbApi.get(`/movie/${movieId}`);
    return response.data;
};

export const fetchMovieCredits = async (movieId) => {
    const response = await tmdbApi.get(`/movie/${movieId}/credits`);
    return response.data.cast;
};

export const fetchMovieReviews = async (movieId) => {
    const response = await tmdbApi.get(`/movie/${movieId}/reviews`);
    return response.data.results;
};