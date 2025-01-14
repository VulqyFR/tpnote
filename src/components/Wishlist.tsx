import { useWishlist } from '../contexts/WishlistProvider';
import styles from './FilmList.module.css';

const Wishlist = () => {
    const { wishlist, removeFromWishlist } = useWishlist();

    if (wishlist.length === 0) {
        return <div>Your wishlist is empty</div>;
    }

    return (
        <>
            <h1>My Wishlist ({wishlist.length} movies)</h1>
            <div className={styles.container}>
                {wishlist.map((movie) => (
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
                                onClick={() => removeFromWishlist(movie.id)}
                                className={styles.button}
                                style={{ backgroundColor: '#dc2626' }}
                            >
                                Remove
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default Wishlist;
