import styles from '../../styles/movie/MovieDetail.module.css';

interface Props {
    title: string;
    onBack: () => void;
}

export const MovieHeader = ({ title, onBack }: Props) => (
    <header className={styles.header}>
        <button onClick={onBack} className={styles.backButton}>
            ← Back
        </button>
        <h1 className={styles.title}>{title}</h1>
    </header>
);
