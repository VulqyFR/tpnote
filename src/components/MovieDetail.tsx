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
            <header className={styles.header}>
                <button
                    onClick={() => navigate(-1)}
                    className={styles.backButton}
                >
                    ← Back
                </button>
                <h1 className={styles.title}>{movie.title}</h1>
            </header>

            <main className={styles.mainContent}>
                <div className={styles.posterSection}>
                    <img
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        alt={movie.title}
                        className={styles.poster}
                    />
                    <button
                        onClick={() => addToWishlist(movie)}
                        className={styles.wishlistButton}
                    >
                        Add to Wishlist
                    </button>
                </div>

                <div className={styles.info}>
                    <div className={styles.metadata}>
                        <span>★ {movie.vote_average.toFixed(1)}/10</span>
                        <span>{movie.release_date}</span>
                        <span>{movie.vote_count} votes</span>
                    </div>
                    <p className={styles.overview}>{movie.overview}</p>
                </div>
            </main>

            <section className={styles.castSection}>
                <h2>Main Cast</h2>
                <div className={styles.castGrid}>
                    {cast.map((actor) => (
                        <div key={actor.id} className={styles.castMember}>
                            <img
                                src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                                alt={actor.name}
                                className={styles.castImage}
                            />
                            <h3>{actor.name}</h3>
                            <p>{actor.character}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section className={styles.similarSection}>
                <h2>Similar Movies</h2>
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
                            <h3>{movie.title}</h3>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};
