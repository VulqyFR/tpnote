import { useState, useEffect, useCallback, useDeferredValue } from 'react';
import { useNavigate } from 'react-router';
import styles from './FilmList.module.css';
import { Movie } from '../types/movie';

type Category = 'popular' | 'now_playing' | 'top_rated' | 'upcoming';

export const FilmList = () => {
    const navigate = useNavigate();
    const [movies, setMovies] = useState<Movie[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [category, setCategory] = useState<Category>('popular');

    const deferredSearch = useDeferredValue(searchQuery);

    const fetchMovies = useCallback(
        async (page: number, query: string) => {
            setIsLoading(true);
            try {
                let baseUrl = query
                    ? `https://api.themoviedb.org/3/search/movie`
                    : `https://api.themoviedb.org/3/movie/${category}`;

                let url = `${baseUrl}?api_key=${
                    import.meta.env.VITE_API_KEY
                }&page=${page}`;

                if (query) {
                    url += `&query=${query}`;
                }
                const response = await fetch(url);
                const data = await response.json();
                setMovies(data.results);
                setTotalPages(Math.min(data.total_pages, 500));
            } catch (error) {
                console.error('Error fetching movies:', error);
            } finally {
                setIsLoading(false);
            }
        },
        [category]
    );

    useEffect(() => {
        fetchMovies(currentPage, deferredSearch);
    }, [currentPage, deferredSearch, category, fetchMovies]);

    useEffect(() => {
        setCurrentPage(1);
    }, [deferredSearch, category]);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    const categories = [
        { id: 'popular', name: 'Popular' },
        { id: 'now_playing', name: 'Now Playing' },
        { id: 'top_rated', name: 'Top Rated' },
        { id: 'upcoming', name: 'Upcoming' },
    ];

    return (
        <div className={styles.wrapper}>
            <div className={styles.filters}>
                <input
                    type="search"
                    placeholder="Search movies..."
                    value={searchQuery}
                    onChange={handleSearch}
                    className={styles.searchInput}
                />
                <div className={styles.categories}>
                    {categories.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => setCategory(cat.id as Category)}
                            className={`${styles.categoryButton} ${
                                category === cat.id ? styles.active : ''
                            }`}
                        >
                            {cat.name}
                        </button>
                    ))}
                </div>
            </div>

            {isLoading ? (
                <div className={styles.loading}>Loading...</div>
            ) : (
                <>
                    <div className={styles.container}>
                        {movies.map((movie) => (
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
                                        onClick={() =>
                                            navigate(`/movie/${movie.id}`)
                                        }
                                        className={styles.button}
                                    >
                                        View Details
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className={styles.pagination}>
                        <button
                            disabled={currentPage === 1}
                            onClick={() => setCurrentPage((prev) => prev - 1)}
                        >
                            Previous
                        </button>
                        <span>
                            Page {currentPage} of {totalPages}
                        </span>
                        <button
                            disabled={currentPage === totalPages}
                            onClick={() => setCurrentPage((prev) => prev + 1)}
                        >
                            Next
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};
