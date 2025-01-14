import { useEffect, useState } from 'react';
import { Movie } from '../types/movie';
import styles from './FilmList.module.css';

export const FilmList = () => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
    const API_KEY = '9995ccfe9d6d3c53afa2cbc8530a25f5';

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await fetch(
                    `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
                );
                const data = await response.json();
                setMovies(data.results);
            } catch (error) {
                console.error('Error fetching movies:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchMovies();
    }, []);

    if (isLoading) {
        return <div className={styles.loading}>Loading...</div>;
    }

    return (
        <>
            <div className={styles.container}>
                {movies.map((movie) => (
                    <div key={movie.id} className={styles.card}>
                        <img
                            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                            alt={movie.title}
                            className={styles.image}
                        />
                        <h2 className={styles.title}>{movie.title}</h2>
                        <div className={styles.footer}>
                            <span className={styles.rating}>
                                ★ {movie.vote_average.toFixed(1)}/10
                            </span>
                            <button
                                onClick={() => setSelectedMovie(movie)}
                                className={styles.button}
                            >
                                View Details
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            {selectedMovie && <></>}
        </>
    );
};
