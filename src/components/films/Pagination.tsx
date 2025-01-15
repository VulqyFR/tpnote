import styles from '../../styles/films/Pagination.module.css';

interface Props {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export const Pagination = ({
    currentPage,
    totalPages,
    onPageChange,
}: Props) => (
    <div className={styles.pagination}>
        <button
            disabled={currentPage === 1}
            onClick={() => onPageChange(currentPage - 1)}
        >
            Previous
        </button>
        <span>
            Page {currentPage} of {totalPages}
        </span>
        <button
            disabled={currentPage === totalPages}
            onClick={() => onPageChange(currentPage + 1)}
        >
            Next
        </button>
    </div>
);
