import styles from '../../styles/films/MovieList.module.css';
import { MovieCard } from './MovieCard';
import { Movie } from '../../types/film-list';

interface Props {
    movies: Movie[];
    onViewDetails: (id: number) => void;
}

export const MovieList = ({ movies, onViewDetails }: Props) => (
    <div className={styles.container}>
        {movies.map((movie) => (
            <MovieCard
                key={movie.id}
                movie={movie}
                onViewDetails={onViewDetails}
            />
        ))}
    </div>
);
