import styles from '../../styles/movie/MovieDetail.module.css';
import { Movie } from '../../types/movie';

interface MovieInfoProps {
    movie: Movie;
    isInWishlist: boolean;
    onAddToWishlist: (movie: Movie) => void;
}

export const MovieInfo = ({
    movie,
    isInWishlist,
    onAddToWishlist,
}: MovieInfoProps) => (
    <main className={styles.mainContent}>
        <div className={styles.posterSection}>
            <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className={styles.poster}
            />
            <button
                onClick={() => onAddToWishlist(movie)}
                className={`${styles.wishlistButton} ${
                    isInWishlist ? styles.inWishlist : ''
                }`}
            >
                {isInWishlist ? 'In Wishlist' : 'Add to Wishlist'}
            </button>
        </div>
        <div className={styles.info}>
            <h1>{movie.title}</h1>
            <div className={styles.metadata}>
                <span>★ {movie.vote_average.toFixed(1)}/10</span>
                <span>{movie.release_date}</span>
                <span>{movie.vote_count} votes</span>
            </div>
            <p className={styles.overview}>{movie.overview}</p>
        </div>
    </main>
);
