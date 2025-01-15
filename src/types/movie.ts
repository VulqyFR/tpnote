export interface Movie {
    id: number;
    title: string;
    overview: string;
    poster_path: string;
    release_date: string;
    vote_average: number;
    vote_count: number;
}

export interface Cast {
    id: number;
    name: string;
    description: string;
    character: string;
    profile_path: string | null;
}

export interface MovieDetailProps {
    movie: Movie;
    isInWishlist: boolean;
    onAddToWishlist: (movie: Movie) => void;
}
