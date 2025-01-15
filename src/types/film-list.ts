export type Category = 'popular' | 'now_playing' | 'top_rated' | 'upcoming';

export interface Movie {
    id: number;
    title: string;
    poster_path: string;
    vote_average: number;
}
