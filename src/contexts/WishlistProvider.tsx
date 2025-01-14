import { createContext, useContext, useState } from 'react';
import { Movie } from '../types/movie';

interface WishlistContextType {
    wishlist: Movie[];
    addToWishlist: (movie: Movie) => void;
}

const WishlistContext = createContext<WishlistContextType | null>(null);

export const WishlistProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const [wishlist, setWishlist] = useState<Movie[]>([]);

    const addToWishlist = (movie: Movie) => {
        setWishlist((prev) => [...prev, movie]);
    };

    return (
        <WishlistContext.Provider value={{ wishlist, addToWishlist }}>
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
