import styles from '../../styles/films/SearchBar.module.css';

interface Props {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const SearchBar = ({ value, onChange }: Props) => (
    <input
        type="search"
        placeholder="Search movies..."
        value={value}
        onChange={onChange}
        className={styles.searchInput}
    />
);
