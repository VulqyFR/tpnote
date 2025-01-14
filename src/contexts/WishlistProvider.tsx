import { createContext, useContext, useState, useEffect } from 'react';
import { Movie } from '../types/movie';

interface WishlistContextType {
    wishlist: Movie[];
    addToWishlist: (movie: Movie) => void;
    removeFromWishlist: (movieId: number) => void;
    isInWishlist: (movieId: number) => boolean;
}

const WISHLIST_STORAGE_KEY = 'movieWishlist';

const WishlistContext = createContext<WishlistContextType | null>(null);

export const WishlistProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const [wishlist, setWishlist] = useState<Movie[]>(() => {
        const savedWishlist = localStorage.getItem(WISHLIST_STORAGE_KEY);
        return savedWishlist ? JSON.parse(savedWishlist) : [];
    });

    useEffect(() => {
        localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlist));
    }, [wishlist]);

    const addToWishlist = (movie: Movie) => {
        setWishlist((prev) => {
            if (prev.some((m) => m.id === movie.id)) {
                return prev;
            }
            return [...prev, movie];
        });
    };

    const isInWishlist = (movieId: number) => {
        return wishlist.some((movie) => movie.id === movieId);
    };

    const removeFromWishlist = (movieId: number) => {
        setWishlist((prev) => prev.filter((movie) => movie.id !== movieId));
    };

    return (
        <WishlistContext.Provider
            value={{
                wishlist,
                addToWishlist,
                removeFromWishlist,
                isInWishlist,
            }}
        >
            {children}
        </WishlistContext.Provider>
    );
};

export const useWishlist = () => {
    const context = useContext(WishlistContext);
    if (!context)
        throw new Error('useWishlist must be used within WishlistProvider');
    return context;
};
