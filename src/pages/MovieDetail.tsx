import { useEffect, useState } from 'react';
import styles from '../styles/movie/MovieDetail.module.css';
import { Movie } from '../types/movie';
import { useNavigate, useParams } from 'react-router';
import { useWishlist } from '../contexts/WishlistProvider';
import { Cast } from '../types/movie';
import { CastList } from '../components/movie/CastList';
import { SimilarMovies } from '../components/movie/SimilarMovies';
import { MovieHeader } from '../components/movie/MovieHeader';
import { MovieInfo } from '../components/movie/MovieInfo';

export const MovieDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToWishlist, isInWishlist } = useWishlist();
    const [movie, setMovie] = useState<Movie | null>(null);
    const [cast, setCast] = useState<Cast[]>([]);
    const [similarMovies, setSimilarMovies] = useState<Movie[]>([]);

    const isMovieInWishlist = movie ? isInWishlist(movie.id) : false;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const movieResponse = await fetch(
                    `https://api.themoviedb.org/3/movie/${id}?api_key=${
                        import.meta.env.VITE_API_KEY
                    }`
                );
                const movieData = await movieResponse.json();
                setMovie(movieData);

                const [castData, similarData] = await Promise.all([
                    fetch(
                        `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${
                            import.meta.env.VITE_API_KEY
                        }`
                    ).then((res) => res.json()),
                    fetch(
                        `https://api.themoviedb.org/3/movie/${id}/similar?api_key=${
                            import.meta.env.VITE_API_KEY
                        }`
                    ).then((res) => res.json()),
                ]);

                setCast(castData.cast.slice(0, 10));
                setSimilarMovies(similarData.results.slice(0, 6));
            } catch (error) {
                console.error('Error fetching movie data:', error);
            }
        };

        fetchData();
    }, [id]);

    if (!movie) return <div>Loading...</div>;

    return (
        <div className={styles.container}>
            <MovieHeader title={movie.title} onBack={() => navigate(-1)} />

            <MovieInfo
                movie={movie}
                isInWishlist={isMovieInWishlist}
                onAddToWishlist={addToWishlist}
            />

            <CastList cast={cast} />

            <SimilarMovies movies={similarMovies} />
        </div>
    );
};
