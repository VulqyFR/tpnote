import { Link } from 'react-router';
import { useWishlist } from '../../contexts/WishlistProvider';
import styles from '../../styles/navbar/Navbar.module.css';

const Navbar = () => {
    const { wishlist } = useWishlist();

    return (
        <nav className={styles.navbar}>
            <div className={styles.container}>
                <Link to="/" className={styles.logo}>
                    TP noté - Elvin Chauvel
                </Link>

                <div className={styles.links}>
                    <Link to="/" className={styles.link}>
                        Movie list
                    </Link>
                    <Link to="/wishlist" className={styles.link}>
                        Wishlist ({wishlist.length})
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
