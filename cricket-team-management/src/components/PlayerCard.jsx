import { Link } from 'react-router-dom';

function PlayerCard({ player, onDeleteClick }) {
  const roleClass = `role-${player.role.replace(' ', '')}`;

  return (
    <div className="col-md-6 col-lg-4 mb-4">
      <div className="card card-custom h-100 p-3">
        <div className="d-flex justify-content-between align-items-start mb-2">
          <h5 className="brand-font mb-0">{player.playerName}</h5>
          <span className="fw-bold" style={{ color: 'var(--accent)' }}>
            #{player.jerseyNumber}
          </span>
        </div>

        <span className={`role-badge ${roleClass} mb-2`} style={{ width: 'fit-content' }}>
          {player.role}
        </span>

        <ul className="list-unstyled small text-muted mb-3 mt-2">
          <li><i className="bi bi-bar-chart-fill me-2"></i>{player.totalMatches ?? 0} matches played</li>
          <li><i className="bi bi-flag-fill me-2"></i>{player.teamName || '—'}</li>
          <li><i className="bi bi-geo-alt-fill me-2"></i>{player.countryOrStateName || '—'}</li>
        </ul>

        {player.description && (
          <p className="small text-muted fst-italic mb-3">"{player.description}"</p>
        )}

        <div className="mt-auto d-flex gap-2">
          <Link
            to={`/edit-player/${player.playerId}`}
            className="btn btn-sm btn-primary-custom flex-fill"
          >
            <i className="bi bi-pencil-square me-1"></i> Edit
          </Link>
          <button
            className="btn btn-sm btn-outline-danger flex-fill"
            onClick={() => onDeleteClick(player)}
          >
            <i className="bi bi-trash3 me-1"></i> Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default PlayerCard;