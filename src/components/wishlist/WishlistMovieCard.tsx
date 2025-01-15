import styles from '../../styles/wishlist/WishlistMovieCard.module.css';
import { Movie } from '../../types/movie';

interface Props {
    movie: Movie;
    onRemove: (id: number) => void;
}

export const WishlistMovieCard = ({ movie, onRemove }: Props) => (
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
                onClick={() => onRemove(movie.id)}
                className={styles.button}
                style={{ backgroundColor: '#dc2626' }}
            >
                Remove
            </button>
        </div>
    </div>
);
