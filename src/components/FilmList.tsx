import { useEffect, useState } from 'react';
import { Movie } from '../types/movie';
import styles from './FilmList.module.css';
import { useNavigate } from 'react-router';

export const FilmList = () => {
    const navigate = useNavigate();
    const [movies, setMovies] = useState<Movie[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await fetch(
                    `https://api.themoviedb.org/3/movie/popular?api_key=${
                        import.meta.env.VITE_API_KEY
                    }&language=en-US&page=1`
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
        <div className={styles.wrapper}>
            <h1 className={styles.title}>Popular movies :</h1>
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
                                onClick={() => navigate(`/movie/${movie.id}`)}
                                className={styles.button}
                            >
                                View Details
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
