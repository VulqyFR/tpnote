import { Route, Routes } from 'react-router';
import { FilmList } from './pages/FilmList';
import { MovieDetail } from './pages/MovieDetail';
import { WishlistProvider } from './contexts/WishlistProvider';
import Wishlist from './pages/Wishlist';
import Navbar from './components/navbar/Navbar';

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
