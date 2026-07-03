import { Link, useLocation } from 'react-router-dom';

function Navbar() {
  const location = useLocation();

  return (
    <nav className="navbar navbar-expand-lg" style={{ backgroundColor: 'var(--primary-dark)' }}>
      <div className="container">
        <Link className="navbar-brand brand-font text-white d-flex align-items-center gap-2" to="/">
          <i className="bi bi-shield-fill-check fs-4" style={{ color: 'var(--accent)' }}></i>
          Cricket Team Manager
        </Link>
        <div className="d-flex gap-2">
          <Link
            to="/"
            className={`btn btn-sm ${location.pathname === '/' ? 'btn-accent' : 'btn-outline-light'}`}
          >
            <i className="bi bi-people-fill me-1"></i> Players
          </Link>
          <Link
            to="/add-player"
            className={`btn btn-sm ${location.pathname === '/add-player' ? 'btn-accent' : 'btn-outline-light'}`}
          >
            <i className="bi bi-person-plus-fill me-1"></i> Add Player
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;