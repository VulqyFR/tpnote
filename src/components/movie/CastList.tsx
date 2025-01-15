import styles from '../../styles/movie/MovieDetail.module.css';
import { Cast } from '../../types/movie';

interface CastListProps {
    cast: Cast[];
}

export const CastList = ({ cast }: CastListProps) => (
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
);
