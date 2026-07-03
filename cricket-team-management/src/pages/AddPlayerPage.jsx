import PlayerForm from '../components/PlayerForm';
import playerService from '../services/playerService';

function AddPlayerPage() {
  const handleAdd = async (playerData) => {
    await playerService.createPlayer(playerData);
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <h2 className="brand-font mb-4">
            <i className="bi bi-person-plus-fill me-2" style={{ color: 'var(--primary)' }}></i>
            Add New Player
          </h2>
          <PlayerForm onSubmit={handleAdd} />
        </div>
      </div>
    </div>
  );
}

export default AddPlayerPage;