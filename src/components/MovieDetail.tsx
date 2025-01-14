import { useEffect, useState } from 'react';
import styles from './MovieDetail.module.css';
import { Movie } from '../types/movie';
import { useNavigate, useParams } from 'react-router';
import { useWishlist } from '../contexts/WishlistProvider';

interface Cast {
    id: number;
    name: string;
    description: string;
    character: string;
    profile_path: string | null;
}

export const MovieDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToWishlist } = useWishlist();
    const [movie, setMovie] = useState<Movie | null>(null);
    const [cast, setCast] = useState<Cast[]>([]);
    const [similarMovies, setSimilarMovies] = useState<Movie[]>([]);

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

                const castResponse = await fetch(
                    `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${
                        import.meta.env.VITE_API_KEY
                    }`
                );
                const castData = await castResponse.json();
                setCast(castData.cast.slice(0, 10));

                const similarResponse = await fetch(
                    `https://api.themoviedb.org/3/movie/${id}/similar?api_key=${
                        import.meta.env.VITE_API_KEY
                    }`
                );
                const similarData = await similarResponse.json();
                setSimilarMovies(similarData.results.slice(0, 6));
            } catch (error) {
                console.error('Error fetching movie data:', error);
            }
        };

        fetchData();
    }, [id]);

    if (!movie) return <div>Loading...</div>;

    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <div className={styles.content}>
                    <img
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        alt={movie.title}
                        className={styles.poster}
                    />
                    <div className={styles.info}>
                        <div className={styles.top}>
                            <h2 className={styles.title}>{movie.title}</h2>
                            <button
                                className={styles.closeButton}
                                onClick={() => navigate('/')}
                            >
                                ×
                            </button>
                        </div>
                        <p className={styles.description}>{movie.overview}</p>
                        <p className={styles.overview}>{movie.overview}</p>
                        <div className={styles.metadata}>
                            <p>Release Date: {movie.release_date}</p>
                            <p>Rating: ★ {movie.vote_average.toFixed(1)}/10</p>
                            <p>Votes: {movie.vote_count}</p>
                        </div>
                        <button
                            onClick={() => {
                                addToWishlist(movie);
                                navigate('/');
                            }}
                        >
                            Add to Wishlist
                        </button>
                    </div>
                </div>
                <div className={styles.similarSection}>
                    <h3>Similar Movies</h3>
                    <div className={styles.similarGrid}>
                        {similarMovies.map((movie) => (
                            <div
                                key={movie.id}
                                className={styles.similarMovie}
                                onClick={() => navigate(`/movie/${movie.id}`)}
                            >
                                <img
                                    src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                                    alt={movie.title}
                                    className={styles.similarImage}
                                />
                                <p className={styles.similarTitle}>
                                    {movie.title}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
                <div className={styles.castSection}>
                    <h3>Main Cast</h3>
                    <div className={styles.castGrid}>
                        {cast.map((actor) => (
                            <div key={actor.id} className={styles.castMember}>
                                <img
                                    src={
                                        actor.profile_path
                                            ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
                                            : '/placeholder.png'
                                    }
                                    alt={actor.name}
                                    className={styles.castImage}
                                />
                                <p className={styles.actorName}>{actor.name}</p>
                                <p className={styles.character}>
                                    {actor.character}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
