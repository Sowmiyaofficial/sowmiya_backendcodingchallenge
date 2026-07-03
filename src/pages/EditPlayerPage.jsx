import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PlayerForm from '../components/PlayerForm';
import Loader from '../components/Loader';
import playerService from '../services/playerService';

function EditPlayerPage() {
  const { playerId } = useParams();
  const [player, setPlayer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPlayer = async () => {
      try {
        const data = await playerService.getPlayerById(playerId);
        setPlayer(data);
      } catch (err) {
        setError('Player not found.');
      } finally {
        setLoading(false);
      }
    };
    fetchPlayer();
  }, [playerId]);

  const handleUpdate = async (playerData) => {
    await playerService.updatePlayer(playerId, playerData);
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <h2 className="brand-font mb-4">
            <i className="bi bi-pencil-square me-2" style={{ color: 'var(--primary)' }}></i>
            Edit Player
          </h2>
          {loading ? (
            <Loader />
          ) : error ? (
            <div className="alert alert-danger">{error}</div>
          ) : (
            <PlayerForm initialData={player} onSubmit={handleUpdate} isEdit={true} />
          )}
        </div>
      </div>
    </div>
  );
}

export default EditPlayerPage;