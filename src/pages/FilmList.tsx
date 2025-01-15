import { useState, useEffect, useCallback } from 'react';
import { useDebounce } from '../hooks/useDebounce';
import { useNavigate } from 'react-router';
import styles from '../styles/films/FilmList.module.css';
import { MovieList } from '../components/films/MovieList';
import { Pagination } from '../components/films/Pagination';
import { SearchBar } from '../components/films/Searchbar';
import { CategoryFilter } from '../components/films/CategoryFilter';
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

    const debouncedSearch = useDebounce(searchQuery, 500);

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
        fetchMovies(currentPage, debouncedSearch);
    }, [currentPage, debouncedSearch, category, fetchMovies]);

    useEffect(() => {
        setCurrentPage(1);
    }, [debouncedSearch, category]);

    return (
        <div className={styles.wrapper}>
            <div className={styles.filters}>
                <SearchBar
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <CategoryFilter
                    category={category}
                    onCategoryChange={setCategory}
                />
            </div>
            {isLoading ? (
                <div className={styles.loading}>Loading...</div>
            ) : (
                <>
                    <MovieList
                        movies={movies}
                        onViewDetails={(id) => navigate(`/movie/${id}`)}
                    />
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={setCurrentPage}
                    />
                </>
            )}
        </div>
    );
};
