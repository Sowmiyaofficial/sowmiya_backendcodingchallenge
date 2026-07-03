import { useState, useEffect } from 'react';
import playerService from '../services/playerService';
import PlayerCard from '../components/PlayerCard';
import ConfirmModal from '../components/ConfirmModal';
import Loader from '../components/Loader';

function PlayersPage() {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [playerToDelete, setPlayerToDelete] = useState(null);

  const fetchPlayers = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await playerService.getAllPlayers();
      setPlayers(data);
    } catch (err) {
      setError('Could not load players. Please make sure the backend server is running.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlayers();
  }, []);

  const handleDeleteConfirm = async () => {
    try {
      await playerService.deletePlayer(playerToDelete.playerId);
      setPlayers((prev) => prev.filter((p) => p.playerId !== playerToDelete.playerId));
    } catch (err) {
      setError('Failed to delete player. Please try again.');
    } finally {
      setPlayerToDelete(null);
    }
  };

  const filteredPlayers = players.filter((p) =>
    p.playerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (p.teamName || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="page-header text-center">
        <div className="container">
          <h1 className="mb-1">Cricket Team Roster</h1>
          <p className="mb-0" style={{ opacity: 0.85 }}>
            Manage your squad — view, add, update and remove players
          </p>
        </div>
      </div>

      <div className="container pb-5">
        <div className="row mb-4 align-items-center">
          <div className="col-md-6">
            <div className="input-group">
              <span className="input-group-text bg-white border-end-0">
                <i className="bi bi-search text-muted"></i>
              </span>
              <input
                type="text"
                className="form-control border-start-0"
                placeholder="Search by name, role, or team..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="col-md-6 text-md-end mt-3 mt-md-0">
            <span className="text-muted">{filteredPlayers.length} player(s) found</span>
          </div>
        </div>

        {error && (
          <div className="alert alert-danger">
            <i className="bi bi-exclamation-triangle-fill me-2"></i>{error}
          </div>
        )}

        {loading ? (
          <Loader />
        ) : filteredPlayers.length === 0 ? (
          <div className="text-center py-5 text-muted">
            <i className="bi bi-emoji-frown fs-1 d-block mb-2"></i>
            No players found.
          </div>
        ) : (
          <div className="row">
            {filteredPlayers.map((player) => (
              <PlayerCard
                key={player.playerId}
                player={player}
                onDeleteClick={setPlayerToDelete}
              />
            ))}
          </div>
        )}
      </div>

      <ConfirmModal
        show={!!playerToDelete}
        playerName={playerToDelete?.playerName}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setPlayerToDelete(null)}
      />
    </>
  );
}

export default PlayersPage;