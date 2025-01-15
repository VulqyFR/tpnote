import styles from '../../styles/films/MovieCard.module.css';
import { Movie } from '../../types/film-list';

interface Props {
    movie: Movie;
    onViewDetails: (id: number) => void;
}

export const MovieCard = ({ movie, onViewDetails }: Props) => (
    <div className={styles.card}>
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
                onClick={() => onViewDetails(movie.id)}
                className={styles.button}
            >
                View Details
            </button>
        </div>
    </div>
);
