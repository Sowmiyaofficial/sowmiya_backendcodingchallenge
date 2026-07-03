function Loader() {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center py-5">
      <div className="spinner-border" style={{ color: 'var(--primary)' }} role="status"></div>
      <p className="text-muted mt-3">Loading players...</p>
    </div>
  );
}

export default Loader;