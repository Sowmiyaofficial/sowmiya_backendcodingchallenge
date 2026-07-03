import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import PlayersPage from './pages/PlayersPage';
import AddPlayerPage from './pages/AddPlayerPage';
import EditPlayerPage from './pages/EditPlayerPage';

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<PlayersPage />} />
        <Route path="/add-player" element={<AddPlayerPage />} />
        <Route path="/edit-player/:playerId" element={<EditPlayerPage />} />
      </Routes>
    </div>
  );
}

export default App;