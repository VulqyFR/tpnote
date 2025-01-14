import { Route, Routes } from 'react-router';
import { FilmList } from './components/FilmList';
import { MovieDetail } from './components/MovieDetail';
import { WishlistProvider } from './contexts/WishlistProvider';

function App() {
    return (
        <WishlistProvider>
            <Routes>
                <Route path="/" element={<FilmList />} />
                <Route path="/movie/:id" element={<MovieDetail />} />
            </Routes>
        </WishlistProvider>
    );
}

export default App;
