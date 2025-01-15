import styles from '../../styles/films/CategoryFilter.module.css';
import { Category } from '../../types/film-list';

interface Props {
    category: Category;
    onCategoryChange: (category: Category) => void;
}

export const CategoryFilter = ({ category, onCategoryChange }: Props) => {
    const categories = [
        { id: 'popular', name: 'Popular' },
        { id: 'now_playing', name: 'Now Playing' },
        { id: 'top_rated', name: 'Top Rated' },
        { id: 'upcoming', name: 'Upcoming' },
    ];

    return (
        <div className={styles.categories}>
            {categories.map((cat) => (
                <button
                    key={cat.id}
                    onClick={() => onCategoryChange(cat.id as Category)}
                    className={`${styles.categoryButton} ${
                        category === cat.id ? styles.active : ''
                    }`}
                >
                    {cat.name}
                </button>
            ))}
        </div>
    );
};
