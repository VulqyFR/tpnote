import { useNavigate } from 'react-router';
import styles from '../../styles/movie/MovieDetail.module.css';
import { Movie } from '../../types/movie';

interface SimilarMoviesProps {
    movies: Movie[];
}

export const SimilarMovies = ({ movies }: SimilarMoviesProps) => {
    const navigate = useNavigate();

    return (
        <section className={styles.similarSection}>
            <h2>Similar Movies</h2>
            <div className={styles.similarGrid}>
                {movies.map((movie) => (
                    <div
                        key={movie.id}
                        className={styles.similarMovie}
                        onClick={() => navigate(`/movie/${movie.id}`)}
                    >
                        <img
                            src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                            alt={movie.title}
                            className={styles.similarImage}
                        />
                        <h3>{movie.title}</h3>
                    </div>
                ))}
            </div>
        </section>
    );
};
