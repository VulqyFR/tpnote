import { Route, Routes } from 'react-router';
import { FilmList } from './components/FilmList';

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<FilmList />} />
            </Routes>
        </>
    );
}

export default App;
