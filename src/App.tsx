import { Route, Routes } from 'react-router';
import { FilmList } from './components/FilmList';
import { MovieDetail } from './components/MovieDetail';
import { WishlistProvider } from './contexts/WishlistProvider';
import Wishlist from './components/Wishlist';
import Navbar from './components/Navbar';

function App() {
    return (
        <WishlistProvider>
            <Navbar />
            <Routes>
                <Route path="/" element={<FilmList />} />
                <Route path="/movie/:id" element={<MovieDetail />} />
                <Route path="/wishlist" element={<Wishlist />} />
            </Routes>
        </WishlistProvider>
    );
}

export default App;
