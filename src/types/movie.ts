export interface Movie {
    id: number;
    title: string;
    overview: string;
    poster_path: string;
    release_date: string;
    vote_average: number;
    vote_count: number;
}

export interface ModalProps {
    movie: Movie;
    onClose: () => void;
}
