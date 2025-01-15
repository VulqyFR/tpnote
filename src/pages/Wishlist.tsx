import { useWishlist } from '../contexts/WishlistProvider';
import { WishlistMovieCard } from '../components/wishlist/WishlistMovieCard';
import { EmptyWishlist } from '../components/wishlist/EmptyWishlist';
import styles from '../styles/wishlist/Wishlist.module.css';

const Wishlist = () => {
    const { wishlist, removeFromWishlist } = useWishlist();

    if (wishlist.length === 0) {
        return <EmptyWishlist />;
    }

    return (
        <div className={styles.wrapper}>
            <h1 className={styles.title}>
                My Wishlist ({wishlist.length} movies)
            </h1>
            <div className={styles.container}>
                {wishlist.map((movie) => (
                    <WishlistMovieCard
                        key={movie.id}
                        movie={movie}
                        onRemove={removeFromWishlist}
                    />
                ))}
            </div>
        </div>
    );
};

export default Wishlist;
